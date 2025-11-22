
const Device = require('../models/Device');
const User = require('../models/User');

exports.getLastDevices = () => Device.find().sort({createdAt: -1}).limit(6);

exports.getAll =() => Device.find();

exports.create = async (userId, deviceData) => {

    const createdDevice = await Device.create({
        owner: userId,
        ...deviceData
    });

    await User.findByIdAndUpdate(userId, {$push: {createdDevice: createdDevice._id}});

    return createdDevice;

};

exports.getOne = (deviceId) => Device.findById(deviceId);

exports.getOneWithDetails = (deviceId) => this.getOne(deviceId).populate('owner').populate('preferredList');

exports.prefer = async (deviceId, userId) => {
    await Device.findByIdAndUpdate(deviceId, { $push: {preferredList: userId }}, {runValidators: true});
    await User.findByIdAndUpdate(userId, { $push: { preferDevice: deviceId}}, {runValidators: true});

};

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
exports.cancelPrefer = async (deviceId, userId) => {
    await Device.findByIdAndUpdate(
        deviceId,
        {$pull: {preferredList: userId}}, {runValidators: true}
    )

    await User.findByIdAndUpdate(
        userId,
        {$pull: {preferDevice: deviceId}}, {runValidators: true}
    )
}
exports.cancelMultiPrefer = async (deviceIds, userId) => {
    await Device.updateMany(
        {_id: {$in: deviceIds}},
        {$pull: {preferredList: userId}},
        {runValidators: true}
    );
    await User.findByIdAndUpdate(
        userId,
        {$pull: {preferDevice: {$in: deviceIds}}},
        {runValidators: true})
}
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@


exports.delete = (deviceId) => Device.findByIdAndDelete(deviceId);

exports.delete1 = async (deviceId, userId) => {
    await Device.findByIdAndDelete(deviceId);
    await User.findByIdAndUpdate(userId, {$pull: {createdDevice: deviceId}}, {runValidators: true} )

}

exports.edit = (deviceId, deviceData) => Device.findByIdAndUpdate(deviceId, deviceData, {runValidators: true})

exports.deleteMultiple = (deviceIds) => {
    return Device.deleteMany({ _id: { $in: deviceIds } });
};

exports.search = (brand) => Device.find({brand: {$regex: brand, $options: 'i'}});
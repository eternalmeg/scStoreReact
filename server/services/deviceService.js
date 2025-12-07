
const Device = require("../models/Device");

exports.getLatest = () => {
    return Device.find().sort({ createdAt: -1 }).limit(3);
};

exports.getAll = () => {
    return Device.find();
};

exports.getById = (id) => {
    return Device.findById(id);
};

exports.create = (data) => {
    return Device.create(data);
};

exports.update = (id, data) => {
    return Device.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

exports.remove = (id) => {
    return Device.findByIdAndDelete(id);
};

exports.search = (query) => {
    return Device.find({ brand: { $regex: query, $options: "i" } });
};

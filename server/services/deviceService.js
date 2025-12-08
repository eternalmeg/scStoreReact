
const Device = require("../models/Device");

exports.getLatest = () => {
    return Device.find().sort({ createdAt: -1 }).limit(3);
};

exports.getAll = () => {
    return Device.find();
};

exports.getById = (id) => {
    return Device.findById(id)
        .populate({
            path: "reviewList",
            populate: {
                path: "user",
                select: "firstName lastName"
            }
        });
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
    const regex = new RegExp(query, "i"); // i = ignore case

    return Device.find({
        $or: [
            { brand: regex },
            { model: regex },
            { sku: regex },
            { shortDescription: regex },
            { description: regex }
        ]
    });
};


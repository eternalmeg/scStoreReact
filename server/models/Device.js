const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true,
        trim: true,
    },
    model: {
        type: String,
        required: true,
        trim: true,
    },
    sku: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        enum: ['Laptop', 'Desktop', 'Server', 'Tablet', 'Phone'],
        required: true
    },
    quantity: {
        type: Number,
        min: 0,
        default: 1
    },


    shortDescription: {
        type: String,
        maxLength: 200
    },


    description: {
        type: String,
        required: true
    },


    images: [{
        type: String, // URL-и
    }],


    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },


    reviewList: [{
        type: mongoose.Types.ObjectId,
        ref: 'Review'
    }],


    averageRating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    }
}, { timestamps: true });

const Device = mongoose.model('Device', deviceSchema);
module.exports = Device;

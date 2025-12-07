const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },

    items: [{
        device: {
            type: mongoose.Types.ObjectId,
            ref: 'Device',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        }
    }],

    totalPrice: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: ['pending', 'processing', 'completed', 'cancelled'],
        default: 'pending'
    }

}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const noSpaceValidator = {
    validator: function (value) {
        return !/\s/.test(value);
    }, message: 'No empty space or tabs!'
}

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        minLength: 2,
        maxLength: 20,
        required: [true, 'First name is required']
    },

    lastName: {
        type: String,
        minLength: 2,
        maxLength: 20,
        required: [true, 'Last name is required']
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        minLength: 8,
        unique: true
    },

    phone: {
        type: String,
        required: [true, 'Phone is required'],
        minLength: 9
    },

    password: {
        type: String,
        minLength: 4,
        required: [true, 'Password is required']
    },

    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },


    wishlist: [{
        type: mongoose.Types.ObjectId,
        ref: 'Device'
    }],


    cart: [{
        device: {
            type: mongoose.Types.ObjectId,
            ref: 'Device'
        },
        quantity: {
            type: Number,
            default: 1,
            min: 1
        }
    }]

}, { timestamps: true });

userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 12);
});


userSchema.pre('findOneAndUpdate', async function () {
    const update = this.getUpdate();

    if (update.password) {
        update.password = await bcrypt.hash(update.password, 12);
    }
});


const User = mongoose.model('User', userSchema);
module.exports = User;

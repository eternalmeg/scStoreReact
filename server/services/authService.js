const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt');
const Device = require("../models/Device");
const SECRET = 'hklhkjhjhjhhkh445hhhkhj';

exports.register = async (userData) => {
    const userExistCheck = await User.findOne({ email: userData.email });
    if (userExistCheck) {
        throw new Error('This email address is already used.');
    }

    if (!userData.name?.trim() || !userData.phone?.trim() || !userData.password?.trim()) {
        throw new Error('No empty fields or script allowed');
    }


    userData.role = 'user';

    const user = await User.create(userData);
    const result = await generateToken(user);

    return result;
};

exports.login = async ({ email, password }) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Invalid email or password.');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        throw new Error('Invalid email or password.');
    }

    return await generateToken(user);
};

exports.getInfo = async (userId) => {
    return User.findById(userId)
        .populate('createdDevice')
        .populate('preferDevice');
};

exports.edit = async (userId, userData) => {
    const user = await User.findByIdAndUpdate(
        userId,
        userData,
        { runValidators: true, new: true }  
    );

    const payload = {
        _id: user._id,
        email: user.email,
        role: user.role
    };

    const token = await jwt.sign(payload, SECRET, { expiresIn: '24h' });

    return { user, token };
};

exports.getOwners = async (ownerIds) => {
    return User.find({ _id: { $in: ownerIds } });
};

exports.getUserById = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};

async function generateToken(user) {
    const payload = {
        _id: user._id,
        email: user.email,
        role: user.role
    };

    const token = await jwt.sign(payload, SECRET, { expiresIn: '24h' });

    return {
        _id: user._id,
        email: user.email,
        role: user.role,
        accessToken: token
    };
}

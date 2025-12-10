const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcrypt');
require('dotenv').config();

mongoose.connect(process.env.PRODUCTION_DATABASE_URL)
    .then(async () => {

        const hashed = await bcrypt.hash('admin123', 12);

        await User.create({
            firstName: 'Admin',
            lastName: 'User',
            email: 'admin@scstore.com',
            phone: '000000000',
            role: 'admin',
            password: "123456"
        });

        console.log("Admin created!");
        process.exit(0);
    });

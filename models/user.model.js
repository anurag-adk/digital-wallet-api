const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name cannot be empty'],
        },
        username: {
            type: String,
            required: [true, 'Username cannot be empty'],
            unique: true,
        },
        email: {
            type: String,
            required: [true, 'Email cannot be empty'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Password cannot be empty'],
        },
        address: {
            type: String,
        },
        balance: {
            type: Number,
            required: [true, 'Balance cannot be empty'],
            min: [0, 'Balance cannot be -ve'],
        },
    },
    {
        timestamps: true,
    }
);

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;

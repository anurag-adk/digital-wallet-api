const mongoose = require('mongoose');

const isUnique = async (field, value) => {
    const query = {};
    query[field] = value;
    try {
        const existingUser = await mongoose.model('users').findOne(query);
        return !existingUser;
    } catch (err) {
        res.status(400).json({
            status: 'Failed',
            message: err.message,
        });
    }
};

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name cannot be empty'],
        },
        username: {
            type: String,
            required: [true, 'Username cannot be empty'],
            validate: {
                validator: async (value) => {
                    return await isUnique('username', value);
                },
                message: 'Username is already in use',
            },
        },
        email: {
            type: String,
            required: [true, 'Email cannot be empty'],
            validate: {
                validator: async (value) => {
                    return await isUnique('email', value);
                },
                message: 'Email is already in use',
            },
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
        },
    },
    {
        timestamps: true,
    }
);

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;

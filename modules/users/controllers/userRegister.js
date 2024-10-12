const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userRegister = async (req, res) => {
    const users = mongoose.model('users');
    // console.log(req.body);
    const { name, username, email, password, address, balance } = req.body;
    const encPassword = await bcrypt.hash(password, 11);

    try {
        const createdUser = await users.create({
            name,
            username,
            email,
            password: encPassword,
            address,
            balance,
        });
    } catch (err) {
        res.status(400).json({
            status: 'Failed',
            message: err.message,
        });
        return;
    }

    res.status(200).json({
        status: 'Success',
        message: 'User Registered!',
    });
};

module.exports = userRegister;

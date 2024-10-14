const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userLogin = async (req, res) => {
    const users = mongoose.model('users');
    const { email, password } = req.body;

    try {
        if (!email) throw 'Please provide email!';
        if (!password) throw 'Please provide password!';

        const getUser = await users.findOne({ email });
        if (!getUser) throw 'The user does not exist! Please register first!';

        const isPasswordCorrect = await bcrypt.compare(
            password,
            getUser.password
        );
        if (!isPasswordCorrect) throw 'Email and Password do not match';
    } catch (err) {
        res.status(400).json({
            status: 'Failed',
            message: err,
        });
        return;
    }

    //All is well
    const getUserForAccessToken = await users.findOne({ email });

    const accessToken = jwt.sign(
        {
            _id: getUserForAccessToken._id,
            email: getUserForAccessToken.email,
            username: getUserForAccessToken.username,
            name: getUserForAccessToken.name,
        },
        process.env.secret_salt,
        { expiresIn: '3 days' }
    );

    res.status(200).json({
        status: 'Success',
        message: 'User Logged In',
        accessToken,
    });
};

module.exports = userLogin;

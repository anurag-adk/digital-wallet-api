const mongoose = require('mongoose');

const userDashboard = async (req, res) => {
    const user = mongoose.model('users');

    const getUserData = await user
        .findOne({
            _id: req.user._id,
        })
        .select('balance name');
    // console.log(req.user.email);
    res.status(200).json({
        data: getUserData,
    });
};

module.exports = userDashboard;

const mongoose = require('mongoose');

const userDashboard = async (req, res) => {
    const user = mongoose.model('users');
    const Transaction = mongoose.model('transactions');

    let getTransactionHistory;
    let getUserData;

    try {
        getTransactionHistory = await Transaction.find({
            user_id: req.user._id,
        })
            .select('amount remarks transaction_type createdAt')
            .sort('-createdAt')
            .limit(5);

        getUserData = await user
            .findOne({
                _id: req.user._id,
            })
            .select('balance name');
    } catch (err) {
        res.status(400).json({
            status: 'Failed',
            message: err.message,
        });
    }

    // console.log(req.user.email);
    res.status(200).json({
        data: getUserData,
        transactions: getTransactionHistory,
    });
};

module.exports = userDashboard;

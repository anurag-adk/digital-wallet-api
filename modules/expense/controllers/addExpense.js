const mongoose = require('mongoose');
const addExpense = async (req, res) => {
    const user = mongoose.model('users');
    const { amount, remarks } = req.body;
    //Validations...
    try {
        if (!amount) throw 'Amount cannot be empty';
        if (amount < 10) throw 'Transactions of less than Rs.10 is not allowed';
        if (!remarks) throw 'Remarks cannot be empty';
        if (remarks.length < 3)
            throw 'Remarks must be at least 3 character long';
    } catch (err) {
        res.status(400).json({
            status: 'Failed',
            message: err,
        });
        return;
    }

    //All is well...
    await user.updateOne(
        {
            _id: req.user._id,
        },
        {
            $inc: { balance: amount * -1 },
        },
        {
            runValidators: true,
        }
    );

    res.status(200).json({
        status: 'Success',
        message: 'Expense added',
    });
};

module.exports = addExpense;

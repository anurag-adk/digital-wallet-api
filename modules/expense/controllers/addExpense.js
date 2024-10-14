const mongoose = require('mongoose');

const addExpense = async (req, res) => {
    const user = mongoose.model('users');
    const Transaction = mongoose.model('transactions');
    const { amount, remarks } = req.body;

    //Validations are in schema...
    try {
        const account = await user.findById(req.user._id).select('balance');
        // console.log(account);
        if (account.balance < amount) throw 'Insufficient Balance';
    } catch (err) {
        res.status(400).json({
            status: 'Failed',
            message: err,
        });
        return;
    }

    //All is well...

    try {
        //Transaction History...
        await Transaction.create({
            amount,
            remarks,
            transaction_type: 'expense',
            user_id: req.user._id,
        });

        //Expense Update...
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
    } catch (err) {
        res.status(400).json({
            status: 'Failed',
            message: err.message,
        });
        return;
    }

    res.status(200).json({
        status: 'Success',
        message: 'Expense added',
    });
};

module.exports = addExpense;

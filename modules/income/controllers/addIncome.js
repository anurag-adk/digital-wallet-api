const mongoose = require('mongoose');

const addIncome = async (req, res) => {
    const user = mongoose.model('users');
    const Transaction = mongoose.model('transactions');
    const { amount, remarks } = req.body;

    //Validations are in schema...
    // try {
    //     if (!amount) throw 'Amount cannot be empty';
    //     if (amount < 10) throw 'Transactions of less than Rs.10 is not allowed';
    //     if (!remarks) throw 'Remarks cannot be empty';
    //     if (remarks.length < 3)
    //         throw 'Remarks must be at least 3 character long';
    // } catch (err) {
    //     res.status(400).json({
    //         status: 'Failed',
    //         message: err,
    //     });
    //     return;
    // }

    //All is well...

    try {
        //Transaction History...
        await Transaction.create({
            amount,
            remarks,
            transaction_type: 'income',
            user_id: req.user._id,
        });

        //Balance Update...
        await user.updateOne(
            {
                _id: req.user._id,
            },
            {
                $inc: { balance: amount },
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
        message: 'Income Added',
    });
};

module.exports = addIncome;

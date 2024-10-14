const mongoose = require('mongoose');
const transactionSchema = new mongoose.Schema(
    {
        amount: {
            type: Number,
            required: [true, 'Amount cannot be empty'],
            min: [10, 'Transactions of less than Rs.10 is not allowed'],
            max: [
                100000,
                'Transactions of more than Rs.100,000 is not allowed',
            ],
        },
        remarks: {
            type: String,
            required: [true, 'Remarks cannot be empty'],
            minLength: [3, 'Remarks must be at least 3 characters long'],
            maxLength: [20, 'Remarks must not exceed 20 characters'],
        },
        transaction_type: {
            type: String,
            enum: ['income', 'expense'],
            required: [true, 'Transaction type is required'],
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: [true, 'User id cannot be empty'],
        },
    },
    {
        timestamps: true,
    }
);

const transactionModel = mongoose.model('transactions', transactionSchema);

module.exports = transactionModel;

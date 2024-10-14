const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./modules/users/user.routes');
const incomeRouter = require('./modules/income/income.routes');
const expenseRouter = require('./modules/expense/expense.routes');
require('dotenv').config();

const PORT = process.env.PORT;
const db_conn = process.env.db_conn;

const app = express();
app.use(express.json());

//Models...
require('./models/user.model');
require('./models/transactions.model');

mongoose
    .connect(db_conn, {})
    .then(() => {
        console.log('Database connection successful!');
    })
    .catch((err) => {
        console.log('Database connection failed!', err);
    });

//Routes...
app.use('/api/user', userRouter);
app.use('/api/income', incomeRouter);
app.use('/api/expense', expenseRouter);

app.listen(PORT, () => {
    console.log(`Server started at port: ${PORT}`);
});

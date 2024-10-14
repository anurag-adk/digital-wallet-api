const express = require('express');
const auth = require('../../middlewares/auth');
const addExpense = require('./controllers/addExpense');
const expenseRouter = express.Router();

expenseRouter.patch('/add', auth, addExpense);

module.exports = expenseRouter;

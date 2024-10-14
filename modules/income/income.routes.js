const express = require('express');
const auth = require('../../middlewares/auth');
const addIncome = require('./controllers/addIncome');
const incomeRouter = express.Router();

incomeRouter.patch('/add', auth, addIncome);

module.exports = incomeRouter;

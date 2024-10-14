const express = require('express');
const userRegister = require('./controllers/userRegister');
const userLogin = require('./controllers/userLogin');
const userDashboard = require('./controllers/userDashboard');
const auth = require('../../middlewares/auth');
const userRouter = express.Router();

//Public routes...
userRouter.post('/register', userRegister);
userRouter.post('/login', userLogin);

//Protected routes...

// userRouter.use(auth);
userRouter.get('/dashboard', auth, userDashboard);

module.exports = userRouter;

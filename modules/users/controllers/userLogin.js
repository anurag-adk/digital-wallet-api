const userLogin = (req, res) => {
    res.status(200).json({
        status: 'Success',
        message: 'User Login',
    });
};

module.exports = userLogin;

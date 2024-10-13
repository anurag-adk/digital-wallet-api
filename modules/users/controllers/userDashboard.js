const userDashboard = (req, res) => {
    console.log(req.user.email);
    res.status(200).json({
        status: 'Success',
        message: 'Welcome to Dashboard!',
    });
};

module.exports = userDashboard;

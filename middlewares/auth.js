const jwt = require('jsonwebtoken');
const auth = (req, res, next) => {
    // console.log(req.headers);

    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        res.status(401).json({
            status: 'Failed',
            message: 'Authorization Failed! Login first!',
        });
        return;
    }

    //check authorization token genuineness...
    const token = authorizationHeader.split('Bearer ')[1];
    // console.log(token);
    try {
        const checkToken = jwt.verify(token, process.env.secret_salt);
        // console.log(checkToken);
        req.user = checkToken;
    } catch (err) {
        res.status(401).json({
            status: 'Failed',
            message: 'Authorization Failed! Token has been compromised!',
        });
        return;
    }
    next();
};

module.exports = auth;

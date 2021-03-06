import jwt from 'jsonwebtoken';

module.exports = function (req, res, next) {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).json({
            message: "auth failed"
        })
    }
    try {
        const verified = jwt.verify(token, process.env.tokens)
        req.user = verified;
        next();
    }
    catch (error) {
        res.status(400).json({
            message: "invalid token"
        });
    }


}
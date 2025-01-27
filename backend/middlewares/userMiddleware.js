const jwt = require('jsonwebtoken');

function userMiddleware(req, res, next) {
    const token = req.cookies?.token || req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Invalid token' });
    }
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = user.userId;
        next();
    } catch (err) {
        console.error(err);
        return res.status(403).json({ message: 'Token verification failed' });
    }
}

module.exports = userMiddleware;

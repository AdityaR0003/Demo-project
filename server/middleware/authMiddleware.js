const { verifyToken } = require('../utils/jwtUtils');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Authentication token required. Please sign in.'
        });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
        return res.status(403).json({
            success: false,
            message: 'Invalid or expired session token. Please sign in again.'
        });
    }

    req.user = decoded;
    next();
}

module.exports = {
    authenticateToken
};

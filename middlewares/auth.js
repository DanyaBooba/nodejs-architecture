const authService = require('../services/authService');

function authenticate(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    const payload = authService.verifyAccessToken(token);

    if (!payload) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    req.userId = payload.userId;
    next();
}

module.exports = authenticate;

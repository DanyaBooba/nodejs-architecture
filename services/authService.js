const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config()

const ACCESS_SECRET = process.env.ACCESS_SECRET || '';
const REFRESH_SECRET = process.env.REFRESH_SECRET || '';

module.exports = {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, ACCESS_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign(payload, REFRESH_SECRET, { expiresIn: '7d' });
        return { accessToken, refreshToken };
    },

    async validatePassword(password, hash) {
        return bcrypt.compare(password, hash);
    },

    verifyAccessToken(token) {
        try {
            return jwt.verify(token, ACCESS_SECRET);
        } catch {
            return null;
        }
    },

    verifyRefreshToken(token) {
        try {
            return jwt.verify(token, REFRESH_SECRET);
        } catch {
            return null;
        }
    }
};

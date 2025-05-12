const authService = require('../services/authService');
const UserModel = require('../models/userModel');

class AuthController {
    static async login(req, res) {
        const { username, password } = req.body;
        const user = await UserModel.getByUsername(username);

        if (!user || !(await authService.validatePassword(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const tokens = authService.generateTokens({ userId: user.id });
        res.json(tokens);
    }

    static async refresh(req, res) {
        const { refreshToken } = req.body;
        const payload = authService.verifyRefreshToken(refreshToken);

        if (!payload) {
            return res.status(403).json({ error: 'Invalid token' });
        }

        const newTokens = authService.generateTokens({ userId: payload.userId });
        res.json(newTokens);
    }
}

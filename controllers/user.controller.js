const UserModel = require('../models/user.model');

class UserController {
    static async getAll(req, res) {
        try {
            const users = await UserModel.getAll();
            res.json(users);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    // ... другие методы
}

module.exports = UserController;

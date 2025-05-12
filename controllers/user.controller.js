const UserModel = require('../models/user.model');

class UserController {
    static async getAllUsers(req, res) {
        try {
            if (req.query.id) {
                const user = await UserModel.getById(req.query.id);
                return res.json(user || {});
            }

            const users = await UserModel.getAll();
            res.json(users);
        } catch (err) {
            console.error(`Ошибка: ${err}`);
            res.status(500).json({ error: 'Ошибка на стороне сервера' });
        }
    }

    static async createUser(req, res) {
        try {
            const { firstName, lastName, username, email, password } = req.body;
            const userId = await UserModel.create({ firstName, lastName, username, email, password });
            res.status(201).json({ id: userId });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async updateUserFull(req, res) {
        try {
            const userId = req.params.id
            const { firstName, lastName, username } = req.body
            const statusUpdate = await UserModel.updateFull(userId, { firstName, lastName, username });
            res.status(201).json({ status: statusUpdate });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async updateUser(req, res) {
        try {
            const userId = req.params.id
            const userData = req.body
            const statusUpdate = await UserModel.update(userId, userData);
            res.status(201).json({ status: statusUpdate });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const userId = req.params.id
            const statusDelete = await UserModel.delete(userId)
            res.status(201).json({ status: statusDelete });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = UserController;

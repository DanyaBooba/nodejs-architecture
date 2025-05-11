const pool = require('../config/db');

class UserModel {
    static async getAll() {
        const [rows] = await pool.query('SELECT * FROM users');
        return rows;
    }

    static async getById(id) {
        const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
        return rows.length === 0 ? null : rows[0];
    }

    // ... другие методы
}

module.exports = UserModel;

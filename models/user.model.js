const pool = require('../config/db');

class UserModel {
    static async getAll() {
        const [rows] = await pool.query(`SELECT ${this._fieldsToSelect()} FROM users`);
        return rows;
    }

    static async getById(id) {
        const [rows] = await pool.query(`SELECT ${this._fieldsToSelect()} FROM users WHERE id = ?`, [id]);
        return rows.length === 0 ? null : rows[0];
    }

    static async create({ firstName, lastName, username, email, password }) {
        const [result] = await pool.query(
            'INSERT INTO users (firstName, lastName, username, email, password) VALUES (?, ?, ?, ?, ?)',
            [firstName, lastName, username, email, password]
        );
        return result.insertId;
    }

    static async updateFull(id, { firstName, lastName, username }) {
        const [result] = await pool.query(
            'UPDATE users SET firstName = ?, lastName = ?, username = ? WHERE id = ?',
            [firstName, lastName, username, id]
        );
        return result.affectedRows > 0;
    }

    static async update(id, newData) {
        const fields = Object.keys(newData).map(key => `${key} = ?`).join(', ');
        const values = Object.values(newData);
        values.push(id);

        const [result] = await pool.query(
            `UPDATE users SET ${fields} WHERE id = ?`,
            values
        );
        return result.affectedRows > 0;
    }

    static async delete(id) {
        const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }

    static _fieldsToSelect() {
        return ['firstName', 'lastName', 'username', 'email'].join(',')
    }
}

module.exports = UserModel;

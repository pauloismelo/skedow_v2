const db = require('../db/connection');

const getUserByLogin = async (login) => {   
    const query = `SELECT * FROM TB_USERS WHERE login=?`;
    const [rows] = await db.query(query, [login]);
    return rows;
}

const insertUser = async (login, password) => {
    const query = `INSERT INTO TB_USERS (login, password) VALUES (?, ?)`;
    const [result] = await db.query(query, [login, password]);
    return result.insertId;
}
module.exports = {getUserByLogin, insertUser};
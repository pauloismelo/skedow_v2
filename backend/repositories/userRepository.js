const db = require('../db/connection');

const getUserByLogin = async (login) => {   
    const query = `SELECT * FROM TB_USERS WHERE login=?`;
    const [rows] = await db.query(query, [login]);
    return rows;
}

module.exports = {getUserByLogin};
const db = require('../db/connection');

const getAllEvents = async () =>{
    const [rows] = await db.query(`select * from TB_EVENTS`);
    //console.log(rows);
    return rows;
}

const insertEvent = async (event) => {
    const { title, datestart, dateend, description, priority, type, location, timestart, timeend, guests } = event;

    const guestsString = guests.join();
    const start = new Date(`${datestart} ${timestart || '00:00:00'}`);
    const end = new Date(`${dateend} ${timeend || '00:00:00'}`);

    const query = `insert into TB_EVENTS (title, start, end, description, priority, guests, type, location) values (?,?,?,?,?,?,?,?)`;
    const [result] = await db.query(query, [title, start, end, description, priority, guestsString, type, location]);

    return result.insertId;
}

const getEventById = async (id) => {
    const query = `SELECT * FROM TB_EVENTS WHERE id=?`;
    const [rows] = await db.query(query, [id]);
    return rows[0];
}
module.exports = {getAllEvents, insertEvent, getEventById};
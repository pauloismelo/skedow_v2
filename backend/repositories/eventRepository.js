const db = require('../db/connection');

const getAllEvents = async () =>{
    const [rows] = await db.query(`select * from TB_EVENTS`);
    //console.log(rows);
    return rows;
}

const insertEvent = async (event) => {
    const {title, datestart, dateend, description, priority, type, location} = event;
    const {timestart, timeend, guests} = event || {};

    let guestsString ='';
    if (guests){
        guestsString= guests.join();
        console.log(guestsString)
    }else{
        res.status(500).json({msg: 'You need fill at least one guest', type: 'error'});
    }

    let start, end;

    if (timestart){
        start = new Date(datestart+' '+timestart);
    }else{
        start = new Date(datestart+ ' 00:00:00');
    }

    if (timeend){
        end = new Date(dateend+' '+timeend);
    }else{
        end = new Date(dateend+ ' 00:00:00');
    }

    const query = `insert into TB_EVENTS (title, start, end, description, priority, guests, type, location) values (?,?,?,?,?,?,?,?)`;
    const [result] = await db.query(query, [title, start, end, description, priority, guestsString, type, location]);

    return result.insertId;
}
module.exports = {getAllEvents, insertEvent};
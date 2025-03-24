const app = require('express')
const router = app.Router();

const sendEventEmail = require('../utils/sendEmailICS');
const formatDateToICS = require('../utils/formatDateToICS');

const mysql = require("mysql2")
const db = require('../db/connection');

router.get(`/events`, (req,res)=>{
    db.query(`select * from TB_EVENTS`, (error, result)=>{
        if (error) res.status(500).json({msg: 'Error in get events', type:'error'});
        if (result) {
            res.send(result);
        }
    })
})


router.post(`/new`, (req,res)=>{

    console.log(req.body)
    const {title, datestart, dateend, description, priority, type, location} = req.body;
    const {timestart, timeend, guests} = req.body || {};
    
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

    db.query(`insert into TB_EVENTS (title, start, end, description, priority, guests, type, location) values (?,?,?,?,?,?,?,?)`, [title, start, end, description, priority, guestsString, type, location], (error, result)=>{
        if (error) res.status(500).json({msg: 'Error in insert event', type: 'error'});
        if (result) {
            db.query('select * from TB_EVENTS where id=?', [result.insertId], (error2, result2)=>{
                if (error2) res.status(500).json({msg: 'Error in select new event', type: 'error'});
                if (result2) {
                    //Create a new object, because I don't return a array
                    const newReg = {
                        id: result.insertId,
                        type: result2[0].type,
                        title: result2[0].title,
                        start: result2[0].start,
                        end: result2[0].end,
                        description: result2[0].description,
                        datereg: result2[0].datereg,
                        userreg: result2[0].userreg,
                        priority: result2[0].priority,
                        location: result2[0].location,
                        guests: result2[0].guests,
                    }

                
                    // Detalhes do evento
                    const eventDetails = {
                        type: result2[0].type,
                        title: result2[0].title,
                        description: result2[0].description,
                        location: result2[0].location,
                        startTime: formatDateToICS(result2[0].start), // UTC: YYYYMMDDTHHMMSSZ
                        endTime: formatDateToICS(result2[0].end),   // UTC: YYYYMMDDTHHMMSSZ
                        guests: result2[0].guests,
                    };

                    // Enviar o e-mail
                    sendEventEmail(guestsString, eventDetails);

                    res.status(200).json({msg: 'Event inserted successfully', type: 'success', event: newReg})
                }
            })
            
        }
        ;
        
    })


})


module.exports = router;
const app = require('express')
const router = app.Router();

const sendEventEmail = require('../utils/sendEmailICS');
const formatDateToICS = require('../utils/formatDateToICS');

const mysql = require("mysql2")

//remover o db direto
const db = require('../db/connection');

const eventController = require('../controllers/eventControllers');

router.get(`/events`, eventController.getEvent);

router.post(`/new`, (req,res)=>{

    const id = eventController.insertEvent(req.body);
    if (id){
        db.query('select * from TB_EVENTS where id=?', [id], (error2, result2)=>{
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
    };
})

module.exports = router;
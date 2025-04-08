const eventService = require('../services/eventService');

const getEvent= async (req, res) => {
    try{
        const event = await eventService.listEvents();
        res.json(event);
    }catch(err){
        console.log(err);
        res.status(404).json({msg: err.message, type:'error'});
    }
}

const insertEvent = async (req, res) => {
    try{
        const id = await eventService.insertEvent(req.body);
        res.json({msg: 'Event created successfully', id, type:'success'});
    }catch(err){
        console.log(err);
        res.status(404).json({msg: err.message, type:'error'});
    }
}

module.exports = {getEvent, insertEvent}; 
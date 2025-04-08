const eventRepository = require('../repositories/eventRepository');

const sendEventEmail = require('../utils/sendEmailICS');
const formatDateToICS = require('../utils/formatDateToICS');

const listEvents = async () => {
    return await eventRepository.getAllEvents();
}

const insertEvent = async (eventData) => {
    const requiredFields = ['title', 'datestart', 'dateend', 'description', 'priority', 'type', 'location'];
    requiredFields.forEach(field => {
        if (!eventData[field]) throw new Error(`Field ${field} is required`);
    });

    if (!eventData.guests || !Array.isArray(eventData.guests) || eventData.guests.length === 0) {
        throw new Error('At least one guest is required');
    }
    
    const eventId = await eventRepository.insertEvent(eventData);
    const newEvent = await eventRepository.getEventById(eventId);

    const eventDetails = {
        type: newEvent.type,
        title: newEvent.title,
        description: newEvent.description,
        location: newEvent.location,
        startTime: formatDateToICS(newEvent.start),
        endTime: formatDateToICS(newEvent.end),
        guests: newEvent.guests,
    };

    await sendEventEmail(newEvent.guests, eventDetails);

    return newEvent;
    
}

module.exports = {listEvents, insertEvent};
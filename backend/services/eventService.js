const eventRepository = require('../repositories/eventRepository');

const listEvents = async () => {
    return await eventRepository.getAllEvents();
}

const insertEvent = async (event) => {
    if (!event.title || !event.datestart || !event.dateend || !event.description || !event.priority || !event.type || !event.location) {
        throw new Error('All fields are required');
    }

    const id= await eventRepository.insertEvent(event);
    return id;
}

module.exports = {listEvents, insertEvent};
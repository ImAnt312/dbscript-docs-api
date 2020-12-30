const { getAllEvents } = require('../../src/getall/events');
module.exports = {
  endpoint: '/eventslist',
  func: (req, res) => {
    getAllEvents(eventList => res.json(eventList));
  }
}
const TicketSvc = require('../services/tickets');
const utils = require('../utils');

module.exports = (app) => {
    app.put('/ticket/:id', (req, res) => {
        utils.handleResponse(() => TicketSvc.update(req), res);
    });

    app.post('/ticket', (req, res) => {
        utils.handleResponse(() => TicketSvc.create(req), res);
    });
};

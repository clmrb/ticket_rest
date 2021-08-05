const TicketSvc = require('../services/tickets');
const utils = require('../utils');

module.exports = (app) => {
    app.get('/ticket/:id', (req, res) => {
        utils.handleResponse(() => TicketSvc.get(req), res);
    });

    app.get('/ticket/:id/comments', (req, res) => {
        utils.handleResponse(() => TicketSvc.getComments(req), res);
    });

    app.put('/ticket/:id', (req, res) => {
        utils.handleResponse(() => TicketSvc.update(req), res);
    });

    app.post('/ticket', (req, res) => {
        utils.handleResponse(() => TicketSvc.create(req), res);
    });
};

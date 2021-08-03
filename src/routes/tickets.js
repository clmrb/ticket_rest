const TicketSvc = require('../services/tickets');
const utils = require('../utils');

module.exports = (app) => {
    app.get('/tickets', (req, res) => {

    });

    app.post('/ticket', (req, res) => {
        utils.handleResponse(() => TicketSvc.create(req.body), res);
    });
};

const TicketSvc = require('../services/tickets');
const utils = require('../utils');

module.exports = (app) => {
    /**
     * @apiDefine TicketResponse
     * @apiSuccess {Number} id Id of the ticket
     * @apiSuccess {String} title Title of the ticket
     * @apiSuccess {String} description description of the ticket
     * @apiSuccess {String} status Status of the ticket (todo, wip, done)
     */

    /**
     * @api {get} /ticket/:id Get a ticket
     * @apiName GetTicket
     * @apiGroup Tickets
     *
     * @apiParam {Number} id Ticket Id
     *
     * @apiUse TicketResponse
     *
     * @apiSuccessExample ticket found:
     *     HTTP/1.1 200 OK
     *     {
     *         "id": 1,
     *         "title": "ticket title",
     *         "description": "ticket desc",
     *         "status": "wip"
     *     }
     *
     * @apiErrorExample ticket not found:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "message": "ticket '5' not found"
     *     }
     */
    app.get('/ticket/:id', (req, res) => {
        utils.handleResponse(() => TicketSvc.get(req), res);
    });

    /**
     * @api {put} /ticket/:id Update a ticket
     * @apiName UpdateTicket
     * @apiGroup Tickets
     *
     * @apiParam {Number} id Ticket Id
     *
     * @apiUse TicketResponse
     *
     * @apiSuccessExample ticket updated:
     *     HTTP/1.1 200 OK
     *     {
     *         "id": 1,
     *         "title": "ticket title",
     *         "description": "ticket desc",
     *         "status": "wip"
     *     }
     *
     * @apiErrorExample ticket not found:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "message": "ticket '5' not found"
     *     }
     */
    app.put('/ticket/:id', (req, res) => {
        utils.handleResponse(() => TicketSvc.update(req), res);
    });

    /**
     * @api {post} /ticket/:id Add a ticket
     * @apiName AddTicket
     * @apiGroup Tickets
     *
     * @apiParam {String} title Ticket title
     * @apiParam {String} description Ticket description
     * @apiParam {String} status Ticket status
     *
     * @apiUse TicketResponse
     *
     * @apiSuccessExample ticket added:
     *     HTTP/1.1 200 OK
     *     {
     *         "id": 1,
     *         "title": "ticket title",
     *         "description": "ticket desc",
     *         "status": "wip"
     *     }
     */
    app.post('/ticket', (req, res) => {
        utils.handleResponse(() => TicketSvc.create(req), res);
    });
};

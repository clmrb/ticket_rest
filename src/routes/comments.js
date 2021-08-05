const CommentSvc = require('../services/comments');
const utils = require('../utils');

module.exports = (app) => {
    app.get('/ticket/:id/comments', (req, res) => {
        utils.handleResponse(() => CommentSvc.getFromTicket(req), res);
    });

    app.post('/ticket/:id/comment', (req, res) => {
        utils.handleResponse(() => CommentSvc.create(req), res);
    });
};

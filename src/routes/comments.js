const CommentSvc = require('../services/comments');
const utils = require('../utils');

module.exports = (app) => {
    /**
     * @apiDefine CommentResponse
     * @apiSuccess {Number} id Id of the comment
     * @apiSuccess {String} text Text of the comment
     * @apiSuccess {DateTime} createdAt DateTime when comment was created
     * @apiSuccess {String} updatedAt DateTime when comment was updated
     */

    /**
     * @api {get} /ticket/:id/comments Get comments of a ticket
     * @apiName GetComments
     * @apiGroup Comments
     *
     * @apiParam {Number} id Ticket Id
     *
     * @apiSuccess {Object[]} - List of comments
     * @apiSuccess {Number} -.id Id of the comment
     * @apiSuccess {String} -.text Text of the comment
     * @apiSuccess {DateTime} -.createdAt DateTime when comment was created
     * @apiSuccess {String} -.updatedAt DateTime when comment was updated
     *
     * @apiSuccessExample {json} comments found:
     *     HTTP/1.1 200 OK
     *     [
     *          {
     *              "id": 1,
     *              "text": "blabla1",
     *              "createdAt": "2021-08-06T13:13:10.682Z",
     *              "updatedAt": null
     *          },
     *          {
     *              "id": 2,
     *              "text": "blabla1",
     *              "createdAt": "2021-08-06T13:13:10.682Z",
     *              "updatedAt": "2021-08-07T12:25:07.054Z"
     *          }
     *     ]
     *
     * @apiSuccessExample no comments:
     *     HTTP/1.1 200 OK
     *     []
     *
     * @apiErrorExample ticket not found:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "message": "ticket '5' not found"
     *     }
     */
    app.get('/ticket/:id/comments', (req, res) => {
        utils.handleResponse(() => CommentSvc.getFromTicket(req), res);
    });

    /**
     * @api {post} /ticket/:id/comment Add a comment to a ticket
     * @apiName AddComment
     * @apiGroup Comments
     *
     * @apiParam {Number} id Ticket Id
     * @apiParam {String} text Comment text
     *
     * @apiUse CommentResponse
     *
     * @apiSuccessExample comment added:
     *     HTTP/1.1 200 OK
     *     {
     *         "id": 1,
     *         "text": "blabla1",
     *         "createdAt": "2021-08-06T13:13:10.682Z",
     *         "updatedAt": null
     *     }
     *
     * @apiErrorExample ticket not found:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "message": "ticket '5' not found"
     *     }
     */
    app.post('/ticket/:id/comment', (req, res) => {
        utils.handleResponse(() => CommentSvc.create(req), res);
    });

    /**
     * @api {put} /comment/:id Update a comment
     * @apiName UpdateComment
     * @apiGroup Comments
     *
     * @apiParam {Number} id Comment Id
     *
     * @apiUse CommentResponse
     *
     * @apiSuccessExample comment updated:
     *     HTTP/1.1 200 OK
     *     {
     *         "id": 1,
     *         "text": "blabla1",
     *         "createdAt": "2021-08-06T13:13:10.682Z",
     *         "updatedAt": "2021-08-07T10:11:12.064Z"
     *     }
     *
     * @apiErrorExample comment not found:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "message": "comment '5' not found"
     *     }
     */
    app.put('/comment/:id', (req, res) => {
        utils.handleResponse(() => CommentSvc.update(req), res);
    });

    /**
     * @api {delete} /comment/:id Delete a comment
     * @apiName DeleteComment
     * @apiGroup Comments
     *
     * @apiParam {Number} id Comment Id
     *
     * @apiUse CommentResponse
     *
     * @apiSuccessExample comment deleted:
     *     HTTP/1.1 200 OK
     *     {
     *         "id": 1,
     *         "text": "blabla1",
     *         "createdAt": "2021-08-06T13:13:10.682Z",
     *         "updatedAt": "2021-08-07T10:11:12.064Z"
     *     }
     *
     * @apiErrorExample comment not found:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "message": "comment '5' not found"
     *     }
     */
    app.delete('/comment/:id', (req, res) => {
        utils.handleResponse(() => CommentSvc.delete(req), res);
    });
};

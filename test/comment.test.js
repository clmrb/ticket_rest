const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const server = app.server;
const ready = app.ready;

const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);

let connection = null;
let TicketRepo = null;
let CommentRepo = null;
let UserRepo = null;

describe('Ticket', () => {
    let testUser = null;

    before(async () => {
        await ready;

        connection = require('typeorm').getConnection();
        TicketRepo = connection.getRepository('Ticket');
        CommentRepo = connection.getRepository('Comment');
        UserRepo = connection.getRepository('User');

        await CommentRepo.delete({});
        await TicketRepo.delete({});
        await UserRepo.delete({});
        testUser = await UserRepo.save({
            username: 'test',
            mail: 'test@testdomain.com'
        });
    });

    describe('DELETE /comment/:id', () => {
        let comment = null;

        it('it should fail to delete others comment (401)', async () => {
            const user2 = await UserRepo.save({
                username: 'test2',
                mail: 'test2@testdomain.com'
            });

            const ticket = await TicketRepo.save({
                user2,
                title: 'test',
                description: 'test'
            });
            comment = await CommentRepo.save({
                user: user2,
                ticket,
                createdAt: new Date(),
                text: 'comment'
            });

            const res = await chai.request(server)
                .delete(`/comment/${comment.id}`)
                .set('Authorization', 'Bearer test@testdomain.com');

            res.should.have.status(401);
            res.body.should.be.an('object');
            should.exist(res.body.message);
        });

        it('it should fail to update unknown comment (404)', async () => {
            const res = await chai.request(server)
                .delete('/comment/0')
                .set('Authorization', 'Bearer test@testdomain.com');

            res.should.have.status(404);
            res.body.should.be.an('object');
            should.exist(res.body.message);
        });

        it('it should delete a comment', async () => {
            const res = await chai.request(server)
                .delete(`/comment/${comment.id}`)
                .set('Authorization', 'Bearer test2@testdomain.com');

            res.should.have.status(200);
            res.body.should.be.an('object');

            res.body.text.should.eql(comment.text);
        });
    });

    // finally empty everything
    after(async () => {
        await CommentRepo.delete({});
        await TicketRepo.delete({});
        await UserRepo.delete({});
    });
});

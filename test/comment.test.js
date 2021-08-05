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

const getJwt = async (mail) => {
    const res = await chai.request(server)
        .post('/auth')
        .send({ mail });

    return res.body.token;
};

describe('Comment', () => {
    let testUser = null;
    let user1Token = null;

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
        user1Token = await getJwt('test@testdomain.com');
    });

    describe('PUT /comment/:id', () => {
        let comment = null;
        let user2Token = null;

        it('it should fail to update others comment (401)', async () => {
            const user = await UserRepo.save({
                username: 'test2',
                mail: 'test2@testdomain.com'
            });
            user2Token = await getJwt('test2@testdomain.com');

            comment = await CommentRepo.save({
                user,
                createdAt: new Date(),
                updatedAt: null,
                text: 'test'
            });

            const res = await chai.request(server)
                .put(`/comment/${comment.id}`)
                .set('Cookie', `token=${user1Token}`)
                .send({
                    text: 'comment updated'
                });

            res.should.have.status(401);
            res.body.should.be.an('object');
            should.exist(res.body.message);
        });

        it('it should fail to update unknown comment (404)', async () => {
            const res = await chai.request(server)
                .put('/comment/0')
                .set('Cookie', `token=${user1Token}`)
                .send({
                    text: 'comment updated'
                });

            res.should.have.status(404);
            res.body.should.be.an('object');
            should.exist(res.body.message);
        });

        it('it should update a comment', async () => {
            const res = await chai.request(server)
                .put(`/comment/${comment.id}`)
                .set('Cookie', `token=${user2Token}`)
                .send({
                    text: 'comment updated'
                });

            res.should.have.status(200);
            res.body.should.be.an('object');

            res.body.id.should.eql(comment.id);
            res.body.text.should.eql('comment updated');
        });
    });

    describe('DELETE /comment/:id', () => {
        let comment = null;
        let user3Token = null;

        it('it should fail to delete others comment (401)', async () => {
            const user3 = await UserRepo.save({
                username: 'test3',
                mail: 'test3@testdomain.com'
            });
            user3Token = await getJwt('test3@testdomain.com');

            const ticket = await TicketRepo.save({
                user: user3,
                title: 'test',
                description: 'test'
            });
            comment = await CommentRepo.save({
                user: user3,
                ticket,
                createdAt: new Date(),
                text: 'comment'
            });

            const res = await chai.request(server)
                .delete(`/comment/${comment.id}`)
                .set('Cookie', `token=${user1Token}`);

            res.should.have.status(401);
            res.body.should.be.an('object');
            should.exist(res.body.message);
        });

        it('it should fail to update unknown comment (404)', async () => {
            const res = await chai.request(server)
                .delete('/comment/0')
                .set('Cookie', `token=${user1Token}`);

            res.should.have.status(404);
            res.body.should.be.an('object');
            should.exist(res.body.message);
        });

        it('it should delete a comment', async () => {
            const res = await chai.request(server)
                .delete(`/comment/${comment.id}`)
                .set('Cookie', `token=${user3Token}`);

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

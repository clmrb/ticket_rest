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

    describe('GET /ticket/:id', () => {
        let ticket = null;

        it('it should find a ticket', async () => {
            ticket = await TicketRepo.save({
                user: testUser,
                title: 'test',
                description: 'test'
            });

            const res = await chai.request(server)
                .get(`/ticket/${ticket.id}`)
                .set('Authorization', 'Bearer test@testdomain.com');

            res.should.have.status(200);
            res.body.should.be.an('object');

            res.body.title.should.eql('test');
            res.body.description.should.eql('test');
            res.body.status.should.eql('todo');
        });

        it('it should fail to find a ticket (404)', async () => {
            await CommentRepo.delete({});
            await TicketRepo.delete({});

            const res = await chai.request(server)
                .get(`/ticket/5`)
                .set('Authorization', 'Bearer test@testdomain.com');

            res.should.have.status(404);
            res.body.should.be.an('object');

            should.exist(res.body.message);
        });
    });

    describe('GET /ticket/:id/comments', () => {
        let ticketWithComments = null;
        let ticketNoComments = null;

        it('it should get 2 comments', async () => {
            await CommentRepo.delete({});
            await TicketRepo.delete({});

            ticketWithComments = await TicketRepo.save({
                user: testUser,
                title: 'test',
                description: 'test'
            });
            ticketNoComments = await TicketRepo.save({
                user: testUser,
                title: 'test2',
                description: 'test2'
            });
            await CommentRepo.save([
                {
                    text: 'comment 1',
                    createdAt: new Date(),
                    ticket: ticketWithComments,
                    testUser
                },
                {
                    text: 'comment 2',
                    createdAt: new Date(),
                    ticket: ticketWithComments,
                    user: testUser
                }
            ]);

            const res = await chai.request(server)
                .get(`/ticket/${ticketWithComments.id}/comments`)
                .set('Authorization', 'Bearer test@testdomain.com');

            res.should.have.status(200);
            res.body.should.be.an('array');
            res.body.length.should.eql(2);

            res.body[0].text.should.eql('comment 1');
            res.body[1].text.should.eql('comment 2');
        });

        it('it should not find ticket (404)', async () => {
            const res = await chai.request(server)
                .get(`/ticket/0/comments`)
                .set('Authorization', 'Bearer test@testdomain.com');

            res.should.have.status(404);
            res.body.should.be.an('object');
            should.exist(res.body.message);
        });

        it('it should find 0 comments', async () => {
            const res = await chai.request(server)
                .get(`/ticket/${ticketNoComments.id}/comments`)
                .set('Authorization', 'Bearer test@testdomain.com');

            res.should.have.status(200);
            res.body.should.be.an('array');
            res.body.length.should.eql(0);
        });
    });

    describe('POST /ticket', () => {
        it('it should return 401 (no authorization)', async () => {
            const res = await chai.request(server)
                .post('/ticket')
                .send({
                    title: 'Ticket test',
                    description: 'Ticket description'
                });

            res.should.have.status(401);
            res.body.should.be.an('object');

            should.exist(res.body.message);
        });

        it('it should return 401 (invalid authorization format)', async () => {
            const res = await chai.request(server)
                .post('/ticket')
                .send({
                    title: 'Ticket test',
                    description: 'Ticket description'
                })
                .set('Authorization', 'test@testdomain.com');

            res.should.have.status(401);
            res.body.should.be.an('object');

            should.exist(res.body.message);
        });

        it('it should create a ticket', async () => {
            const res = await chai.request(server)
                .post('/ticket')
                .set('Authorization', 'Bearer test@testdomain.com')
                .send({
                    title: 'Ticket test',
                    description: 'Ticket description'
                });

            res.should.have.status(200);
            res.body.should.be.an('object');

            res.body.title.should.eql('Ticket test');
            res.body.description.should.eql('Ticket description');
            res.body.status.should.eql('todo');
        });

        it('it should fail to create a ticket (empty body)', async () => {
            const res = await chai.request(server)
                .post('/ticket')
                .set('Authorization', 'Bearer test@testdomain.com')
                .send({});

            res.should.have.status(500);
            res.body.should.be.an('object');

            should.exist(res.body.message);
        });
    });

    describe('PUT /ticket/:id', () => {
        it('it should fail to update others ticket (401)', async () => {
            const user = await UserRepo.save({
                username: 'test2',
                mail: 'test2@testdomain.com'
            });

            const ticketFromTest2 = await TicketRepo.save({
                user,
                title: 'test',
                description: 'test'
            });

            const res = await chai.request(server)
                .put(`/ticket/${ticketFromTest2.id}`)
                .set('Authorization', 'Bearer test@testdomain.com')
                .send({
                    title: 'Ticket test updated',
                    description: 'Ticket description updated'
                });

            res.should.have.status(401);
            res.body.should.be.an('object');
            should.exist(res.body.message);
        });

        it('it should fail to update unknown ticket (404)', async () => {
            const res = await chai.request(server)
                .put('/ticket/0')
                .set('Authorization', 'Bearer test@testdomain.com')
                .send({
                    title: 'Ticket test updated',
                    description: 'Ticket description updated'
                });

            res.should.have.status(404);
            res.body.should.be.an('object');
            should.exist(res.body.message);
        });

        it('it should create and update the same ticket', async () => {
            const { body: ticket } = await chai.request(server)
                .post('/ticket')
                .set('Authorization', 'Bearer test@testdomain.com')
                .send({
                    title: 'Ticket test',
                    description: 'Ticket description'
                });

            const res = await chai.request(server)
                .put(`/ticket/${ticket.id}`)
                .set('Authorization', 'Bearer test@testdomain.com')
                .send({
                    title: 'Ticket test updated',
                    description: 'Ticket description updated'
                });

            res.should.have.status(200);
            res.body.should.be.an('object');

            res.body.id.should.eql(ticket.id);
            res.body.title.should.eql('Ticket test updated');
            res.body.description.should.eql('Ticket description updated');
            res.body.status.should.eql('todo');
        });
    });

    // finally empty everything
    after(async () => {
        await CommentRepo.delete({});
        await TicketRepo.delete({});
        await UserRepo.delete({});
    });
});

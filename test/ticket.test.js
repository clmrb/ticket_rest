const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const server = app.server;
const ready = app.ready;

const should = chai.should();
chai.use(chaiHttp);

let connection = null;
let TicketRepo = null;
let UserRepo = null;

describe('Ticket', () => {
    let testUser = null;

    before(async () => {
        await ready;

        connection = require('typeorm').getConnection();
        TicketRepo = connection.getRepository('Ticket');
        UserRepo = connection.getRepository('User');

        await TicketRepo.delete({});
        await UserRepo.delete({});
        testUser = await UserRepo.save({
            username: 'test',
            mail: 'test@testdomain.com'
        });
    });

    // empty ticket table after each test
    afterEach(() => TicketRepo.delete({}));

    describe('GET /ticket/:id', () => {
        let ticket = null;

        before(async () => {
            ticket = await TicketRepo.save({
                user: testUser,
                title: 'test',
                description: 'test'
            });
        });

        it('it should find a ticket', (done) => {
            chai.request(server)
                .get(`/ticket/${ticket.id}`)
                .set('Authorization', 'Bearer test@testdomain.com')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('object');

                    res.body.title.should.eql('test');
                    res.body.description.should.eql('test');
                    res.body.status.should.eql('todo');
                    done();
                });
        });

        it('it should fail to find a ticket (404)', (done) => {
            chai.request(server)
                .get(`/ticket/${ticket.id + 1}`)
                .set('Authorization', 'Bearer test@testdomain.com')
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.an('object');

                    should.exist(res.body.message);
                    done();
                });
        });
    });

    describe('POST /ticket', () => {
        it('it should return 401 (no authorization)', (done) => {
            chai.request(server)
                .post('/ticket')
                .send({
                    title: 'Ticket test',
                    description: 'Ticket description'
                })
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.an('object');

                    should.exist(res.body.message);
                    done();
                });
        });

        it('it should return 401 (invalid authorization format)', (done) => {
            chai.request(server)
                .post('/ticket')
                .send({
                    title: 'Ticket test',
                    description: 'Ticket description'
                })
                .set('Authorization', 'test@testdomain.com')
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.an('object');

                    should.exist(res.body.message);
                    done();
                });
        });

        it('it should create a ticket', (done) => {
            chai.request(server)
                .post('/ticket')
                .set('Authorization', 'Bearer test@testdomain.com')
                .send({
                    title: 'Ticket test',
                    description: 'Ticket description'
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('object');

                    res.body.title.should.eql('Ticket test');
                    res.body.description.should.eql('Ticket description');
                    res.body.status.should.eql('todo');
                    done();
                });
        });

        it('it should fail to create a ticket (empty body)', (done) => {
            chai.request(server)
                .post('/ticket')
                .set('Authorization', 'Bearer test@testdomain.com')
                .send({})
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.an('object');

                    should.exist(res.body.message);
                    done();
                });
        });
    });

    describe('PUT /ticket/:id', () => {
        let ticketFromTest2 = null;

        before(async () => {
            const user = await UserRepo.save({
                username: 'test2',
                mail: 'test2@testdomain.com'
            });

            ticketFromTest2 = await TicketRepo.save({
                user,
                title: 'test',
                description: 'test'
            });
        });

        it('it should fail to update others ticket (401)', async () => {
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

    // finally empty user table
    after(() => UserRepo.delete({}));
});

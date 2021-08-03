const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const server = app.server;
const ready = app.ready;

chai.should();
chai.use(chaiHttp);

let connection = null;
let TicketRepo = null;
let UserRepo = null;

describe('Ticket', () => {

    before(async () => {
        await ready;

        connection = require('typeorm').getConnection();
        TicketRepo = connection.getRepository('Ticket');
        UserRepo = connection.getRepository('User');

        await TicketRepo.delete({});
        await UserRepo.delete({});
        await UserRepo.save({
            username: 'test',
            mail: 'test@testdomain.com'
        });
    });

    // empty ticket table after each test
    afterEach(() => TicketRepo.delete({}));

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

                    res.body.message.should.exist;
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

                    res.body.message.should.exist;
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

                    res.body.status.should.eql(500);
                    res.body.message.should.exist;
                    done();
                });
        });

        // finally empty user table
        after(() => UserRepo.delete({}));
    });
});

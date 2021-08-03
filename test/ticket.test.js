const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const server = app.server;
const ready = app.ready;

chai.should();
chai.use(chaiHttp);

let connection = null;
let TicketRepo = null;

describe('Ticket', () => {

    before(async () => {
        await ready;
        connection = require('typeorm').getConnection();
        TicketRepo = connection.getRepository('Ticket');
    });

    // empty ticket table before each test
    beforeEach(() => TicketRepo.delete({}));

    describe('POST /ticket', () => {
        it('it should create a ticket', (done) => {
            chai.request(server)
                .post('/ticket')
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

        it('it should fail to create a ticket', (done) => {
            chai.request(server)
                .post('/ticket')
                .send({
                    id: 'id is not an integer',
                    title: 'Ticket test',
                    description: 'Ticket description'
                })
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.an('object');

                    res.body.status.should.eql(500);
                    res.body.message.should.exist;
                    done();
                });
        });
    });

});

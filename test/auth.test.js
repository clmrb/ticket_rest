const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const server = app.server;
const ready = app.ready;

const should = chai.should();
chai.use(chaiHttp);

let connection = null;
let UserRepo = null;

describe('Ticket', () => {
    let testUser = null;

    before(async () => {
        await ready;

        connection = require('typeorm').getConnection();
        UserRepo = connection.getRepository('User');

        await UserRepo.delete({});
        testUser = await UserRepo.save({
            username: 'test',
            mail: 'test@testdomain.com'
        });
    });

    describe('POST /auth', () => {
        it('it should auth successfully', async () => {
            const res = await chai.request(server)
                .post('/auth')
                .send({
                    mail: 'test@testdomain.com'
                });

            res.should.have.status(200);
            res.body.should.be.an('object');
            should.exist(res.body.token);
            should.exist(res.headers['set-cookie']);
            res.headers['set-cookie'].length.should.equal(1);
            res.headers['set-cookie'][0].should.contain('token=');
        });

        it('it should fail to auth', async () => {
            const res = await chai.request(server)
                .post('/auth')
                .send({
                    mail: 'test2@testdomain.com'
                });

            res.should.have.status(401);
            res.body.should.be.an('object');
            should.exist(res.body.message);
        });

        it('it should fail to auth', async () => {
            const res = await chai.request(server)
                .post('/auth')
                .send({
                    wrongkey: 'test@testdomain.com'
                });

            res.should.have.status(401);
            res.body.should.be.an('object');
            should.exist(res.body.message);
        });
    });

    // finally empty everything
    after(async () => {
        await UserRepo.delete({});
    });
});

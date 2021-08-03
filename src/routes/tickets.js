const Db = require('./../db');
const connection = Db.getInstance();

console.log(connection.getRepository('Ticket'));

module.exports = (app) => {
    app.get('tickets', (req, res) => {

    });

    app.post('ticket', (req, res) => {

    });
};

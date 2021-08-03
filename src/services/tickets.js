const Db = require('./../db');
const connection = Db.getInstance();

const TicketRepo = connection.getRepository('Ticket');

module.exports = {
    create(content) {
        return TicketRepo.save(content);
    }
};

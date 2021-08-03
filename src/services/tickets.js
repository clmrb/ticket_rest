const connection = require('typeorm').getConnection();

const TicketRepo = connection.getRepository('Ticket');

module.exports = {
    create(content) {
        return TicketRepo.save(content);
    }
};

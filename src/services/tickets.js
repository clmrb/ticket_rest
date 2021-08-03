const connection = require('typeorm').getConnection();

const TicketRepo = connection.getRepository('Ticket');

module.exports = {
    async create({ body, user }) {
        const ticket = {
            title: body.title,
            description: body.description,
            user
        };

        await TicketRepo.insert(ticket);

        return ticket;
    }
};

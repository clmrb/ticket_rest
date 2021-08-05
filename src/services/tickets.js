const connection = require('typeorm').getConnection();

const TicketRepo = connection.getRepository('Ticket');

module.exports = {
    async get({ params }) {
        const ticket = await TicketRepo.findOne({ where: { id: params.id } });

        if (ticket) {
            return {
                status: 200,
                response: ticket
            };
        } else {
            return {
                status: 404,
                response: { message: `ticket '${params.id}' not found` }
            };
        }
    },
    async create({ body, user }) {
        const ticket = {
            title: body.title,
            description: body.description,
            user
        };

        const { raw: insert } = await TicketRepo.insert(ticket);

        return {
            status: 200,
            response: await TicketRepo.findOne({ where: { id: insert.insertId } })
        };
    },
    async update({ body, params, user }) {
        const where = { id: params.id };
        const ticket = await TicketRepo.findOne({ where, relations: ['user'] });

        if (!ticket) {
            return {
                status: 404,
                response: { message: `ticket '${params.id}' not found` }
            };
        }

        if (ticket.user.id !== user.id) {
            return {
                status: 401,
                response: { message: `ticket '${params.id}' is not owned by current user` }
            };
        }

        await TicketRepo.update(params.id, body);

        return {
            status: 200,
            response: await TicketRepo.findOne({ where })
        };
    }
};

const connection = require('typeorm').getConnection();

const TicketSvc = require('../services/tickets');
const CommentRepo = connection.getRepository('Comment');

module.exports = {
    async create({ body, user, params }) {
        const { status, response: ticket } = await TicketSvc.get({ params });

        if (status !== 200) {
            return { status, response: ticket };
        }

        const comment = {
            ticket,
            user,
            createdAt: new Date(),
            text: body.text
        };

        const { raw: insert } = await CommentRepo.insert(comment);

        return {
            status: 200,
            response: await CommentRepo.findOne({ where: { id: insert.insertId } })
        };
    },
    async getFromTicket({ params }) {
        const exists = await TicketSvc.get({ params });

        if (exists.status !== 200) {
            return exists;
        }

        const comments = await CommentRepo
            .createQueryBuilder()
            .where("ticketId = :id", { id: params.id })
            .getMany();

        return {
            status: 200,
            response: comments
        };
    }
};

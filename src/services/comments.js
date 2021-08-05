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
    },
    async update({ body, params, user }) {
        const where = { id: params.id };
        const comment = await CommentRepo.findOne({ where, relations: ['user'] });

        if (!comment) {
            return {
                status: 404,
                response: { message: `comment '${params.id}' not found` }
            };
        }

        if (comment.user.id !== user.id) {
            return {
                status: 401,
                response: { message: `comment '${params.id}' is not owned by current user` }
            };
        }

        await CommentRepo.update(params.id, body);

        return {
            status: 200,
            response: await CommentRepo.findOne({ where })
        };
    },
    async delete({ params, user }) {
        const where = { id: params.id };
        const comment = await CommentRepo.findOne({ where, relations: ['user'] });

        if (!comment) {
            return {
                status: 404,
                response: { message: `comment '${params.id}' not found` }
            };
        }

        if (comment.user.id !== user.id) {
            return {
                status: 401,
                response: { message: `comment '${params.id}' is not owned by current user` }
            };
        }

        await CommentRepo.remove(comment);

        delete comment.user;

        return {
            status: 200,
            response: comment
        };
    }
};

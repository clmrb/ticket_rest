module.exports = {
    async handleResponse(exec, res) {
        try {
            const executed = exec();
            // handle both promise and sync methods
            const result = executed.then ? await executed : executed;

            res.status(result.status).send(result.response);
        } catch (e) {
            const message = { message: 'unexpected error' };
            // @TODO: log error 'e' somewhere but not directly to the response
            res.status(500).send(message);
        }
    }
};

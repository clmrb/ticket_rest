module.exports = {
    async handleResponse(exec, res) {
        try {
            const result = exec();
            // handle both promise and sync methods
            result.then ? res.send(await result) : res.send(result);
        } catch (e) {
            const message = { status: 500, message: 'unexpected error' };
            // @TODO: log error 'e' somewhere but not directly to the response
            res.status(500).send(message);
        }
    }
};

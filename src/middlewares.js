const typeorm = require('typeorm');

module.exports = {
    async verifyToken(req, res, next) {
        if (req.url === '/auth' && req.method === 'POST') {
            return next();
        }
        // stop req if no token provided or invalid format
        if (!req.headers.authorization || req.headers.authorization.indexOf('Bearer') === -1) {
            return res.status(401).send({
                message: 'no credentials'
            });
        }

        const mail = req.headers.authorization.replace('Bearer ', '');
        const UserRepo = typeorm.getConnection().getRepository('User');

        const user = await UserRepo.findOne({ where: { mail } });

        // stop req if user doesn't exist
        if (!user) {
            return res.status(401).send({
                message: 'invalid credentials'
            });
        }

        // token is ok, set user property for future usage
        req.user = user;
        next();
    }
};

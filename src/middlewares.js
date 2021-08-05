const jwt = require('jsonwebtoken');
const invalidCredentials = (res) => res.status(401).send({ message: 'no credentials' });

module.exports = {
    async verifyToken(req, res, next) {
        if (req.url === '/auth' && req.method === 'POST') {
            return next();
        }

        if (!req.cookies || !req.cookies.token) {
            return invalidCredentials(res);
        }

        try {
            const user = jwt.verify(req.cookies.token, process.env.JWT_SECRET || 'secret');

            delete user.iat;
            delete user.exp;

            // token is ok, set user property for future usage
            req.user = user;
            next();
        } catch (e) {
            return invalidCredentials(res);
        }
    }
};

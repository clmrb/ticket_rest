const jwt = require('jsonwebtoken');
const typeorm = require('typeorm');
const invalidCredentials = (res) => res.status(401).send({ message: 'no credentials' });

module.exports = (app) => {
    app.post('/auth', async (req, res) => {
        const mail = req.body.mail;

        if (!mail) {
            return invalidCredentials(res);
        }

        const UserRepo = typeorm.getConnection().getRepository('User');
        const user = await UserRepo.findOne({ where: { mail } });

        if (!user) {
            return invalidCredentials(res);
        }

        // generate jwt
        const token = jwt.sign(user, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });

        // send it via set-cookie
        res.cookie('token', token, { expires: new Date(Date.now() + 3600 * 1000) });
        // send token as response as well
        res.send({ token });
    });
};

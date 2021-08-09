const jwt = require('jsonwebtoken');
const typeorm = require('typeorm');
const invalidCredentials = (res) => res.status(401).send({ message: 'no credentials' });

module.exports = (app) => {
    /**
     * @api {post} /auth Get a JWT
     * @apiName GetUser
     * @apiGroup Auth
     *
     * @apiParam {String} mail User mail
     *
     * @apiSuccess {String} token JWT
     *
     * @apiSuccessExample Ok:
     *     HTTP/1.1 200 OK
     *     {
     *       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o"
     *     }
     *
     * @apiErrorExample Non autorisé:
     *     HTTP/1.1 401 Unauthorized
     *     {
     *       "message": "invalid credentials"
     *     }
     */
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

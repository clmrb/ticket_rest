const typeorm = require('typeorm');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const routes = ['tickets', 'comments'];

app.use(express.json());

module.exports.ready = typeorm.createConnection()
    .then(() => {
        routes.forEach(route => require(`./src/routes/${route}`)(app));

        app.listen(port, () => {
            if (process.env.NODE_ENV === 'dev') {
                console.log(`App listening at http://localhost:${port}`);
            }
        });
    });

module.exports.server = app;

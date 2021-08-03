const typeorm = require('typeorm');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const routes = ['tickets', 'comments'];

app.use(express.json());

typeorm.createConnection()
    .then(connection => {
        routes.forEach(route => require(`./src/routes/${route}`)(app));

        app.listen(port, () => {
            console.log(`App listening at http://localhost:${port}`);
        });
    });

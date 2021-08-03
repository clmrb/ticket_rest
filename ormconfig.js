var typeorm = require("typeorm");
var EntitySchema = typeorm.EntitySchema;

module.exports = {
    "type": "mysql",
    "host": process.env.MYSQL_HOST || "localhost",
    "port": process.env.MYSQL_PORT || 3306,
    "username": process.env.MYSQL_USER || "test",
    "password": process.env.MYSQL_PASSWORD || "test",
    "database": process.env.MYSQL_DATABASE || "ticket-to-ride",
    "entities": [
        new EntitySchema(require("./src/entity/ticket.json")),
        new EntitySchema(require("./src/entity/user.json")),
        new EntitySchema(require("./src/entity/comment.json")),
    ],
    "cli": {
        "migrationsDir": "migrations"
    },
    "migrations": [
        "migrations/*.js"
    ]
};

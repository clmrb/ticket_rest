const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class CreateTables1627995953926 {
    name = 'CreateTables1627995953926'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`ticket-to-ride\`.\`ticket\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`status\` enum ('todo', 'wip', 'done') NOT NULL DEFAULT 'todo', \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ticket-to-ride\`.\`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`mail\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ticket-to-ride\`.\`comment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`text\` varchar(255) NOT NULL, \`createdAt\` datetime NOT NULL, \`ticketId\` int NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`ticket-to-ride\`.\`ticket\` ADD CONSTRAINT \`FK_0e01a7c92f008418bad6bad5919\` FOREIGN KEY (\`userId\`) REFERENCES \`ticket-to-ride\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ticket-to-ride\`.\`comment\` ADD CONSTRAINT \`FK_7522f1f6b36fa4b1742762a17f9\` FOREIGN KEY (\`ticketId\`) REFERENCES \`ticket-to-ride\`.\`ticket\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ticket-to-ride\`.\`comment\` ADD CONSTRAINT \`FK_c0354a9a009d3bb45a08655ce3b\` FOREIGN KEY (\`userId\`) REFERENCES \`ticket-to-ride\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`ticket-to-ride\`.\`comment\` DROP FOREIGN KEY \`FK_c0354a9a009d3bb45a08655ce3b\``);
        await queryRunner.query(`ALTER TABLE \`ticket-to-ride\`.\`comment\` DROP FOREIGN KEY \`FK_7522f1f6b36fa4b1742762a17f9\``);
        await queryRunner.query(`ALTER TABLE \`ticket-to-ride\`.\`ticket\` DROP FOREIGN KEY \`FK_0e01a7c92f008418bad6bad5919\``);
        await queryRunner.query(`DROP TABLE \`ticket-to-ride\`.\`comment\``);
        await queryRunner.query(`DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`ticket-to-ride\`.\`user\``);
        await queryRunner.query(`DROP TABLE \`ticket-to-ride\`.\`user\``);
        await queryRunner.query(`DROP TABLE \`ticket-to-ride\`.\`ticket\``);
    }
}

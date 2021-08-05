const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class AddCommentUpdatedAt1628182524480 {
    name = 'AddCommentUpdatedAt1628182524480'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`ticket-to-ride\`.\`comment\` ADD \`updatedAt\` datetime NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`ticket-to-ride\`.\`comment\` DROP COLUMN \`updatedAt\``);
    }
}

const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class CommentUpdatedAtDefaultValue1628183423565 {
    name = 'CommentUpdatedAtDefaultValue1628183423565'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`ticket-to-ride\`.\`comment\` CHANGE \`updatedAt\` \`updatedAt\` datetime NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`ticket-to-ride\`.\`comment\` CHANGE \`updatedAt\` \`updatedAt\` datetime NOT NULL`);
    }
}

"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.sequelize.transaction(async t => {
            await queryInterface.createTable(
                "users",
                {
                    id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
                    email: { type: Sequelize.STRING, allowNull: false, allowNull: true },
                    password: { type: Sequelize.STRING, allowNull: false },
                    first_name: { type: Sequelize.STRING },
                    last_name: { type: Sequelize.STRING },
                    created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
                    updated_at: { type: Sequelize.DATE, allowNull: false },
                    deleted_at: { type: Sequelize.DATE },
                },
                { transaction: t },
            );
            await queryInterface.addIndex("users", {
                name: "unique_email_uk",
                fields: ["email"],
                allowNull: true,
                where: {
                    deleted_at: null,
                },
                transaction: t,
            });
        });
    },

    async down(queryInterface) {
        await queryInterface.sequelize.transaction(async t => {
            await queryInterface.dropTable("users", { transaction: t });
        });
    },
};

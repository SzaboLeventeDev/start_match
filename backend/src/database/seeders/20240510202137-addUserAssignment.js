'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _) {
    await queryInterface.bulkInsert('userAssignments', [
      {
        userId: 1,
        userRoleId: 1,
        createdAt: '2024-05-11',
        updatedAt: '2024-05-11',
      },
      {
        userId: 2,
        userRoleId: 2,
        createdAt: '2024-05-11',
        updatedAt: '2024-05-11',
      },
    ]);
  },

  async down(queryInterface, _) {
    await queryInterface.bulkDelete('userAssignments', null, {});
  },
};

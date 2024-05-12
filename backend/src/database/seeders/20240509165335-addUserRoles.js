'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _) {
    await queryInterface.bulkInsert(
      'userRoles',
      [
        {
          userRoleId: 0,
          userRoleName: 'Admin',
          createdAt: '2024-05-09',
          updatedAt: '2024-05-09',
        },
        {
          userRoleId: 1,
          userRoleName: 'Enterpreneur',
          createdAt: '2024-05-09',
          updatedAt: '2024-05-09',
        },
        {
          userRoleId: 2,
          userRoleName: 'Investor',
          createdAt: '2024-05-09',
          updatedAt: '2024-05-09',
        },
      ],
      {},
    );
  },

  async down(queryInterface, _) {
    await queryInterface.bulkDelete('userRoles', null, {});
  },
};

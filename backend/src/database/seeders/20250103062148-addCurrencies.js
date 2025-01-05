'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _) {
    await queryInterface.bulkInsert(
      'currencies',
      [
        {
          name: 'Hungarian Forint',
          code: 'HUF',
          isLogicalDeleted: false,
        },
        {
          name: 'Euro',
          code: 'EUR',
          isLogicalDeleted: false,
        },
        {
          name: 'US Dollar',
          code: 'USD',
          isLogicalDeleted: false,
        },
      ],
      {},
    );
  },
  async down(queryInterface, _) {
    await queryInterface.bulkDelete('currencies', null, {});
  },
};

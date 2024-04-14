'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert(
      'users',
      [
        {
          firstName: 'John',
          lastName: 'Doe',
          dateOfBirth: '2000-01-01',
          email: 'john.doe@test.com',
          password:
            '$2a$10$.4I8.eBh7FVAao8pazGELOV8mkNPKlC6LbtiRE/CCNJoddhfWkRjW', // smartMatch_1234
        },
        {
          firstName: 'Jane',
          lastName: 'Doe',
          dateOfBirth: '2000-01-01',
          email: 'john.doe@test.com',
          password:
            '$2a$10$.4I8.eBh7FVAao8pazGELOV8mkNPKlC6LbtiRE/CCNJoddhfWkRjW', // smartMatch_1234
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};

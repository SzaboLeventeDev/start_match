'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('project_categories', [
      {
        categoryName: 'Arts & Crafts',
        isLogicalDeleted: false,
      },
      {
        categoryName: 'Technology & Innovation',
        isLogicalDeleted: false,
      },
      {
        categoryName: 'Film & Video',
        isLogicalDeleted: false,
      },
      {
        categoryName: 'Community & Social Projects',
        isLogicalDeleted: false,
      },
      {
        categoryName: 'Music & Audio',
        isLogicalDeleted: false,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('project_categories', null, {});
    await queryInterface.sequelize.query(`ALTER SEQUENCE "project_categories_categoryId_seq" RESTART WITH 1`);
  },
};

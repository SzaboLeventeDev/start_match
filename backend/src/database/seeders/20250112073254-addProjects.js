'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const projectNames = ['Vibrant Clay Creations', 'Smart Warehouse Automation', 'Short Film About the Future', 'Community Garden Initiative', 'Electronic Beats & Tunes'];

    const projectsData = [
      {
        projectName: projectNames[0],
        categoryId: 1, // Must already exist in project_categories
        startDate: new Date(),
        description: 'Showcasing unique handcrafted clay artworks and design ideas.',
        contactId: 1, // Only one userId available
        startingAmount: 1000,
        currencyId: 1, // E.g., 1 could represent USD
        isLogicalDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        projectName: projectNames[1],
        categoryId: 2,
        startDate: new Date(),
        description: 'Innovative warehouse management and automated solutions.',
        contactId: 1,
        startingAmount: 1500,
        currencyId: 1,
        isLogicalDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        projectName: projectNames[2],
        categoryId: 3,
        startDate: new Date(),
        description: 'A futuristic short film project with a captivating storyline.',
        contactId: 1,
        startingAmount: 2000,
        currencyId: 1,
        isLogicalDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        projectName: projectNames[3],
        categoryId: 4,
        startDate: new Date(),
        description: 'Establishing and maintaining a community garden in the city.',
        contactId: 1,
        startingAmount: 2500,
        currencyId: 1,
        isLogicalDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        projectName: projectNames[4],
        categoryId: 5,
        startDate: new Date(),
        description: 'Producing an electronic music EP and recording sessions.',
        contactId: 1,
        startingAmount: 3000,
        currencyId: 1,
        isLogicalDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('projects', projectsData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('projects', null, {});
    await queryInterface.sequelize.query(`ALTER SEQUENCE "projects_projectId_seq" RESTART WITH 1`);
  },
};

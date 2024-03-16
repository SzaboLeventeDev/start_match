'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('questions_and_answers', {
      questionId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  question: {
    type: Sequelize.STRING(200),
    allowNull: false
  },
  answer: {
    type: Sequelize.STRING(500),
    allowNull: false
  },
  categoryId:{
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  isLogicalDeleted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  }
},
)
  },

  async down (queryInterface, Sequelize) {
  await queryInterface.dropTable('questions_and_answers')
  }
};

"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("questions_and_answers", [
      {
        question: "How I can use the SmartMatch application?",
        answer: "To use the application, you need to register first.",
        categoryId: 1,
        isLogicalDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        question: "Can I use the app as an investor and a startup founder too?",
        answer:
          "Of course, the application provides the opportunity for its users to be present in the SmartMatch system both as investors and as startup entrepreneurs requiring investment, even simultaneously.",
        categoryId: 2,
        isLogicalDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    const { Op } = Sequelize;
    await queryInterface.bulkDelete(
      "questions_and_answers",
      { quesionId: { [Op.in]: [1, 2, 3, 4] } },
      {}
    );
  },
};

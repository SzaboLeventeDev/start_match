import { QuestionAndAnswerAttributes } from "../../models/questionAndAnswer";

export const mockFAQs: QuestionAndAnswerAttributes[] = [
  {
    questionId: 1,
    question: "Test question?",
    answer: "Test answer.",
    isLogicalDeleted: false,
  },
  {
    questionId: 2,
    question: "Test question 2?",
    answer: "Test answer 2.",
    isLogicalDeleted: false
  }
];

export const mockFAQRecords: any = [
  {
    questionId: 1,
    question: "Test question?",
    answer: "Test answer.",
    isLogicalDeleted: false,
    createdAt: new Date("2024.03.17"),
    updatedAt: new Date("2024.03.17"),
    toJSON() {
      return {
        questionId: this.questionId,
        question: this.question,
        answer: this.answer,
        isLogicalDeleted: this.isLogicalDeleted,
      };
    },
  },
  {
    questionId: 2,
    question: "Test question 2?",
    answer: "Test answer 2.",
    isLogicalDeleted: false,
    createdAt: new Date("2024.03.17"),
    updatedAt: new Date("2024.03.17"),
    toJSON() {
      return {
        questionId: this.questionId,
        question: this.question,
        answer: this.answer,
        isLogicalDeleted: this.isLogicalDeleted,
      };
    },
  },
];

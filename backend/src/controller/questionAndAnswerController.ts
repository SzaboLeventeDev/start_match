import { Request, Response } from "express";
import { qetAllFAQs } from "../services/questionAndAnswerService";

const FAQController = {
  /**
   * @function getAllFAQ
   * Sends all of the Q&A-s to the frontend.
   * @param {Request} req Incoming request object
   * @param {Response} res Outgoing response object
   * @returns {Promise<void>} There is not any returning value
   */
  async getAllFAQ(req: Request, res: Response): Promise<void> {
    try {
      const response = await qetAllFAQs();
      res.status(200).json(response);
    } catch (error) {
      res.status(400).json({ message: "Bad request!" });
    }
  },
};

export default FAQController;

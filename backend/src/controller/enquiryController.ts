import { Request, Response } from "express"
import logger from "../logger"
import { createEnquiry, getAllEnquiriesService } from "../services/enquiryService"
import { tracingChannel } from "diagnostics_channel"

/**
 * 
 * Controller object to include the functionality related to the Enquiry model.
 */
const enquiryController = {
  /**
   * @function createEnquiry
   * Save new enquiry to the database
   * @param {Request} req Incoming request object
   * @param {Response} res Outgoing response object
   * @returns {Promise<void>}  There is not any returning value
   */
  async createEnquiry(req: Request, res: Response): Promise<void> {
    try {
      const enquiry = await createEnquiry(req.body);
      res.status(201).json({ enquiry });
    } catch (error) {
      logger.error({ error });
      res.status(400).json({ message: "Bad request!" });
    }
  },

  /**
   * @function getAllEnquiries
   * Returns all of the enquiries from the database
   * @param {Request} req Incoming request object
   * @param {Response} res Outgoing response object
   * @returns {Promise<void>}  There is not any returning value
   */
  async getAllEnquiries(req: Request, res: Response): Promise<void> {
    try {
      const enquiries = await getAllEnquiriesService();
      res.status(200).json({ enquiries });
    } catch (error) {
      logger.error({ error });
      res.status(400).json({ message: "Bad request!" });
    }
  },
};

export default enquiryController
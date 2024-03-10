import { Request, Response } from "express"
import logger from "../logger"
import { createEnquiry } from "../services/enquiryService"
import { EnquiryAttributes } from "../models/landingPage/enquiry"

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
      const enquiry = await createEnquiry(req.body)
      res.status(201).json({enquiry})
    } catch (error) {
      logger.error({error}) // a formátum nem biztos, hogy ez lesz. 
      //middleware kell
      res.status(500).json({message: 'Internal server error'})
    }
  }
}

export default enquiryController
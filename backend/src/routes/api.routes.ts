import express from 'express'
import enquiryController from '../controller/enquiryController'
import validateModel from '../middleware/validateModel'
import { Enquiry, enquiryValidationRules } from '../models/landingPage/enquiry'

const router = express.Router()

router.use(express.json())

router.post(
  "/enquiry",
  validateModel(Enquiry, enquiryValidationRules),
  enquiryController.createEnquiry
);

export default router
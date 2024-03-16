import express from "express";
import enquiryController from "../controller/enquiryController";
import validateModel from "../middleware/validateModel";
import { Enquiry, enquiryValidationRules } from "../models/landingPage/enquiry";
import FAQController from "../controller/questionAndAnswerController";
import cors from "cors";

const router = express.Router();
router.use(cors());
router.use(express.json());

/**
 * Enquiry related endpoints
 */
router.post(
  "/enquiry",
  validateModel(Enquiry, enquiryValidationRules),
  enquiryController.createEnquiry
);

router.get("/enquiries", enquiryController.getAllEnquiries);

/**
 * Frequently Asked Questions related endpoints
 */
router.get("/faq", FAQController.getAllFAQ);

export default router;

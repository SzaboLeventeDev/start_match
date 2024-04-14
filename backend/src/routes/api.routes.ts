import express from 'express';
import cors from 'cors';

import enquiryController from '../controller/enquiryController';
import validateModel from '../middleware/validateModel';
import { Enquiry, enquiryValidationRules } from '../models/landingPage/enquiry';
import FAQController from '../controller/questionAndAnswerController';
import authenticationController from '../controller/authenticationController';
import { RegistrableUsesrValidationRules, User } from '../models/user';

const router = express.Router();
router.use(cors());
router.use(express.json());

/**
 * Enquiry related endpoints
 */
router.post(
  '/enquiry',
  validateModel(Enquiry, enquiryValidationRules),
  enquiryController.createEnquiry,
);

router.get('/enquiries', enquiryController.getAllEnquiries);

/**
 * Frequently Asked Questions related endpoints
 */
router.get('/faq', FAQController.getAllFAQ);

/**
 * Authentication related endpoints
 */
router.post(
  '/registration',
  validateModel(User, RegistrableUsesrValidationRules),
  authenticationController.registrateUser,
);
export default router;

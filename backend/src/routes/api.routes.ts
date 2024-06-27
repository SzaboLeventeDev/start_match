import express from 'express';
import cors from 'cors';

import enquiryController from '../controller/enquiryController';
import validateModel from '../middleware/validateModel';
import { Enquiry, enquiryValidationRules } from '../models/landingPage/enquiry';
import FAQController from '../controller/questionAndAnswerController';
import authenticationController from '../controller/authenticationController';
import { UserPersonalDataValidationRules, LoginUserValidationRules, User } from '../models/user';
import userController from '../controller/userController';
import config from '../config';
import { sessionHandler } from '../middleware/sessionHandler';
import cookieParser from 'cookie-parser';

const router = express.Router();
router.use(cors());
router.use(express.json());
router.use(cookieParser());

/**
 * Enquiry related endpoints
 */
router.post('/enquiry', validateModel(Enquiry, enquiryValidationRules), enquiryController.createEnquiry);

router.get('/enquiries', enquiryController.getAllEnquiries);

/**
 * Frequently Asked Questions related endpoints
 */
router.get('/faq', FAQController.getAllFAQ);

/**
 * Authentication related endpoints
 */
router.post('/registration', validateModel(User, UserPersonalDataValidationRules), authenticationController.registrateUser);

router.post('/login', cors(config.corsOptions), validateModel(User, LoginUserValidationRules), authenticationController.loginUser);

/**
 * User related endpoints
 */
router.post('/select-role');

router.use(sessionHandler);

router.get('/user/:userId', cors(config.corsOptions), userController.getUserById);

router.put('/user/update/:userId', cors(config.corsOptions), validateModel(User, UserPersonalDataValidationRules), userController.updateUser);
export default router;


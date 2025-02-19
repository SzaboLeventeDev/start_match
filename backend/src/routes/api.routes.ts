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
import authorizationController from '../controller/authorizationController';
import { Currency, currencyValidationRules, newCurrencyValidationRules } from '../models/currency';
import { currencyController } from '../controller/masterData/currencyController';
import { projectCategoryController } from '../controller/masterData/projectCategoryController';
import { newProjectCategoryValidationRules, ProjectCategory, projectCategoryValidationRules } from '../models/projectCategory';
import { projectController } from '../controller/masterData/projectController';
import { newProjectValidationRules, Project, projectValidationRules } from '../models/project';

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
router.post('/select-role', authorizationController.addUserRole);

router.use(sessionHandler);

router.get('/user/:userId', cors(config.corsOptions), userController.getUserById);

router.put('/user/update/:userId', cors(config.corsOptions), validateModel(User, UserPersonalDataValidationRules), userController.updateUser);

/**
 * Master data related endpoints
 */

/** Currency related endpoints */
router.get('/master-data/currency/all', cors(config.corsOptions), currencyController.getCurrencies);
router.post('/master-data/currency/add', cors(config.corsOptions), validateModel(Currency, newCurrencyValidationRules), currencyController.addCurrency);
router.put('/master-data/currency/update/:currencyId', cors(config.corsOptions), validateModel(Currency, currencyValidationRules), currencyController.updateCurrency);
router.delete('/master-data/currency/delete/:currencyId', cors(config.corsOptions), currencyController.deleteCurrency);

/** Project category related endpoints */
router.get('/master-data/project-category/all', cors(config.corsOptions), projectCategoryController.getProjectCategories);
router.post('/master-data/project-category/add', cors(config.corsOptions), validateModel(ProjectCategory, newProjectCategoryValidationRules), projectCategoryController.addProjectCategory);
router.put('/master-data/project-category/update/:projectCategoryId', cors(config.corsOptions), validateModel(ProjectCategory, projectCategoryValidationRules), projectCategoryController.updateProjectCategory);
router.delete('/master-data/project-category/delete/:projectCategoryId', cors(config.corsOptions), projectCategoryController.deleteProjectCategory);

/** Project related endpoints */
router.get('/project/my-projects', cors(config.corsOptions), projectController.getMyProjects);
router.post('/project/add', cors(config.corsOptions), validateModel(Project, newProjectValidationRules), projectController.addProject);
router.put('/project/update/:projectId', cors(config.corsOptions), validateModel(Project, projectValidationRules), projectController.updateProject);
router.delete('/project/delete/:projectId', cors(config.corsOptions), validateModel(Project, projectValidationRules), projectController.deleteProject);

export default router;


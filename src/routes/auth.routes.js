import express from 'express';
import { body } from 'express-validator';
import * as authController from '../controllers/auth.controller.js';
import { validateRequest } from '../middleware/validate.js';

const router = express.Router();

router.post('/register', [
    body('username').trim().isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    validateRequest
], authController.register);

router.post('/login', [
    body('email').isEmail(),
    body('password').exists(),
    validateRequest
], authController.login);

router.post('/send-otp', [
    body('phoneNumber').isMobilePhone(),
    validateRequest
], authController.sendOTP);

router.post('/verify-otp', [
    body('phoneNumber').isMobilePhone(),
    body('otp').isLength({ min: 6, max: 6 }),
    validateRequest
], authController.verifyOTP);

router.get('/me', authController.getCurrentUser);

export default router;
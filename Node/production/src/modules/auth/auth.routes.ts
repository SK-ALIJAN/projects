import { Router } from 'express';

import validate from '../../middlewares/validate.js';
import {
    createAccount,
    login,
    resetPassword
} from './controllers/auth.base.controller.js';
import { createAccountValidation } from './auth.validation.js';
const router = Router();

router.post('/register', validate(createAccountValidation), createAccount);
router.post('/login', login);
router.post('/reset-password', resetPassword);

export default router;

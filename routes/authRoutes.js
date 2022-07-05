import express from 'express';
const router = express.Router();

import authenticateMiddleware from '../middleware/authenticate.js';
import { register, login, updateUser } from '../controllers/authControllers.js';

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/updateUser').patch(authenticateMiddleware, updateUser);

export default router;

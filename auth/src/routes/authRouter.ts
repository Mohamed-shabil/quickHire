import express from 'express';
import { signup, login, logout } from '../controller/authController'
const router = express.Router();

router.post('/api/users/signup',signup);
router.post('/api/users/login',login)
router.get('/api/users/logout',logout)



export {router as authRouter}
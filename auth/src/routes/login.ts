import express,{Request,Response} from 'express'
import { body, validationResult } from 'express-validator'
import { validateRequest, BadRequestError} from '@quickhire/common'
import bcrypt from 'bcryptjs'
import { User } from '../model/user';
import jwt from 'jsonwebtoken'
import { createSendToken } from '../utils/createSendToken';

const router = express.Router();

router.post('/api/users/signin',
[
    body('email')
        .isEmail()
        .withMessage('Email ID is not valid or not provided'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Password is required'),
    validateRequest
],
async(req:Request,res:Response)=>{
    try {
        const error = validationResult(req);
        const {email,password} = req.body;
        const existingUser = await User.findOne({email})
        if(!existingUser){
            throw new BadRequestError('Account does not exist')
        }

        const isValidPassword = await bcrypt.compare(password,existingUser.password!);

        if(!isValidPassword){
            throw new BadRequestError('Your email or Password is wrong')
        }

        const payload = {
            _id:existingUser._id.toString(),
            email:existingUser.email,
            name:existingUser.name,
            ...(existingUser.phone &&{phone:existingUser.phone}),
            verified:existingUser.verified,
            isBlocked:existingUser.isBlocked,
            role:existingUser.role
        }
        createSendToken(payload,res);
    } catch (error) {
        console.log(error);
    }

})


export {router as loginRouter}
import express,{Request,Response} from 'express';
import jwt from 'jsonwebtoken';
import {body, validationResult} from 'express-validator'
import catchAsync from '../utils/catchAsync';
import {User} from '../model/user'
import { BadRequestError, validateRequest } from '@quickhire/common';
import { createSendToken } from '../utils/createSendToken';
import { PayloadInterface } from '../utils/createSendToken';

const router = express.Router();
interface JwtPayload{
    name:string;
    email:string;
    phone?:string;
}

router.post('/api/users/gAuth',[
    body('name')
        .notEmpty()
        .withMessage("name can't be empty"),
    body('email')
        .notEmpty()
        .withMessage("email Can't be empty"),
    body('phone')
        .optional()
        .isLength({max:10,min:10})
        .withMessage('phone number must be 10 numbers'),
        validateRequest,
],catchAsync(async(req,res)=>{
    const error = validationResult(req)
    const {name, email,phone} = req.body;
    console.log('Im reaching here....');
    const userExist = await User.findOne({email});
    if(userExist){
        const payload:PayloadInterface = {
            _id:userExist._id.toString(),
            name:userExist.name,
            email:userExist.email,
        }

        if(userExist?.phone){
            payload.phone = userExist.phone
        } 
        createSendToken(payload,res);
    }
    const newUser = new User({
        name,
        email
    })

    if(phone){
        newUser.phone = phone
    }
    await newUser.save();
    const payload = {
        _id:newUser._id.toString(),
        email:newUser.email,
        name:newUser.name,
        ...(newUser.phone && {phone:newUser.phone})
    };
    createSendToken(payload,res);
}));

export { router as googleAuthRouter}
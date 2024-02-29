
import jwt from 'jsonwebtoken';
import express,{NextFunction, Request, Response} from 'express';
import { BadRequestError, validateRequest} from '@quickhire/common'
import { User} from '../model/user'
import nodemailer from 'nodemailer'
import randomString from 'randomstring'
import { body, validationResult } from 'express-validator'
import catchAsync from '../utils/catchAsync'
import bcrypt from 'bcryptjs';
import OtpVerification from '../model/otp';
import { KafkaProducer } from '@quickhire/common';
import { kafkaClient } from '../kafka/kafkaClient';

import { createSendToken } from '../utils/createSendToken';

const router = express.Router();

router.post('/api/users/signup',[
    body('name')
        .notEmpty()
        .isLength({min:4,max:20})
        .withMessage('Password must be between 4 and 20 characters'),
    body('phone')
        .isLength({min:10,max:10})
        .withMessage('Phone number must be 10 characters'),
    body('email')
        .notEmpty()
        .withMessage("email can't be empty")
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .notEmpty()
        .withMessage("password can't be empty")
        .isLength({min:2}),
    body('ConfirmPassword')
        .notEmpty()
        .withMessage("password can't be empty")
        .isLength({min:6})
        .withMessage("Password must be morethan 6 characters long"),
    // body('otpMethod')
    //     .notEmpty()
    //     .withMessage('Select an Otp Method'),
    
    validateRequest
], catchAsync(async (req:Request,res:Response,next:NextFunction)=>{
    const error = validationResult(req);
    const {name, phone, email, password, ConfirmPassword, otpMethod} = req.body;
    const existingUser = await User.findOne({email});
    
    if(existingUser){
        throw new BadRequestError('Email already used');
    }
    if(password !== ConfirmPassword){
        throw new BadRequestError('Passwords are not same');
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const user = new User({
        name,
        email,
        phone,
        password:hashedPassword
    });
    await user.save();

    const otp = randomString.generate({
        length:4,
        charset:'numeric',
    })
    
    const hashedOtp = await bcrypt.hash(otp,10);
    const userOtp = await OtpVerification.create({
        owner:user._id,
        token:hashedOtp,
        otp
    })
    console.log(userOtp);
    const transporter = nodemailer.createTransport({
        service:'Gmail',
        auth:{
            user:process.env.MAIL,
            pass:process.env.MAIL_PASS
        }
    });
    const mailOption = {
        from: process.env.MAIL,
        to: email,
        subject: 'QuickHire Verification OTP',
        html:`<h1>${otp}</h1>
            <br>
            <h2>${process.env.RESET_LINK+hashedOtp}</h2>`
    }
    transporter.sendMail(mailOption,(error,info)=>{
        if(error){
            console.log('Error:',error);
        }else{
            console.log('Email Sent :',info.response);
            res.send('success');
        }
    })

    const payload = {
        _id:user._id.toString(),
        email:user.email,
        name:user.name,
        ...(user.phone &&{phone:user.phone}),
        verified:user.verified,
        isBlocked:user.isBlocked,
        role:user.role,
    }

    createSendToken(payload,res);
}));



export {router as signupRouter}
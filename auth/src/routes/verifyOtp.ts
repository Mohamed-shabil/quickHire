import express,{Request,Response} from 'express'
import catchAsync from '../utils/catchAsync';
import { body, validationResult } from 'express-validator'
import OtpVerification from '../model/otp';
import { BadRequestError } from '@quickhire/common';
import { User } from '../model/user';

const router = express.Router();
router.post('/api/users/verifyOtp',[
    body('otp')
        .notEmpty()
        .withMessage("Otp can't be empty")
        .isLength({min:4,max:4})
        .withMessage("otp must be 4 numbers long")
],catchAsync(async (req:Request,res:Response)=>{
    const {otp} = req.body;
    const otpExist = await OtpVerification.findOne({otp:otp});
    if(!otpExist){
        throw new BadRequestError('OTP is invalid')
    }
    const user = await User.findById({_id:otpExist.owner});
    if(!user){
        throw new BadRequestError('no user with this otp');
    }
    user.verified = true;
    await user.save();
    return res.status(200).json({
        status:'success',
        message:'user verified Successfully'
    })
}))

export {router as verifyOtpRouter}
import express,{Response,Request,NextFunction} from 'express';
import catchAsync from '../utils/catchAsync';
import { BadRequestError } from '@quickhire/common';
import { User } from '../model/user';
import bcrypt from 'bcryptjs'

const router = express.Router();

router.post('/api/users/resetPassword/:token',catchAsync(async(req:Request,res:Response)=>{
    const {token} = req.params;
    console.log(token);
    const {password} = req.body
    const {confirmPassword} = req.body
    if(password!==confirmPassword){
        throw new BadRequestError('Passwords Are not matching')
    }
    const user = await User.findOne({
        resetPasswordToken : token,
        resetPasswordExpires : {$gte:Date.now()}
    })

    if(!user){
        throw new BadRequestError('User with this token is not found')
    }


    const hashedPassword = await bcrypt.hash(password,10);

    user.password = hashedPassword;
    user.resetPasswordExpires = undefined
    user.resetPasswordToken = undefined;
    user.save();
    const payload = {
        name:user.name,
        email:user.email,
        phone:user.phone,
        _id:user._id
    }
    return res.status(200).json({
        status:'Success',
        message:'Password Updated Successfully',
        user:payload
    })
}))

export {router as resetPasswordRouter} 
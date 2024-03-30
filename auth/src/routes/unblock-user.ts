import { catchAsync, requireAuth } from '@quickhire/common';
import express, { Request, Response } from 'express';
import { User } from '../model/user';

const router = express.Router();

router.patch('/api/auth/users/block-user/:userId',requireAuth,catchAsync(async(req:Request,res:Response)=>{
    const {userId} = req.params
    const user = await User.findOneAndUpdate(
        {_id:userId},
        {isBlocked:false},
        {new:true}
    );
    res.status(200).json({
        status:'success',
        user
    });
}))

export { router as blockUserRoute }
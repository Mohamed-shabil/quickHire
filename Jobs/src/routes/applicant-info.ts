import express,{ Request, Response } from 'express'
import { catchAsync, requireAuth, BadRequestError, NotAutherizedError } from '@quickhire/common';
import { User } from '../model/UsersModel'

const router = express.Router();

router.get('/api/jobs/applicant-info',requireAuth,catchAsync(async(req:Request,res:Response)=>{
    const currentUser = req.currentUser

    if( !currentUser ){
        throw new NotAutherizedError();
    }

    const user = await User.findOne({
        where:{
            _id:currentUser._id
        }
    });
    
    if(!user){
        throw new BadRequestError('No User with this User-ID');
    }

    res.status(200).json({
        status:'success',
        user
    })
}))


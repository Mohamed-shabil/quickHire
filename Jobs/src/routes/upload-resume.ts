import express,{Request, Response} from 'express'
import { uploadResume } from '../middleware/upload-resume'
import { BadRequestError, NotAutherizedError, catchAsync, requireAuth } from '@quickhire/common';
import { User } from '../model/UsersModel'
const router = express.Router();

router.post('/api/jobs/upload-resume',requireAuth,uploadResume,catchAsync(async(req:Request,res:Response)=>{
    const file = req.file as Express.MulterS3.File | undefined

    const currentUser = req.currentUser

    if(!currentUser){
        throw new NotAutherizedError();
    }

    const user = await User.findOne({
        where:{
            _id:currentUser._id
        }
    });

    if(!user){
        throw new NotAutherizedError();
    }
    
    const resumes = user.dataValues.resume

    user.set({
        resume:resumes
    });

    await user.save();

    res.status(201).json({
        status:'success',
        resume:user.dataValues.resume
    });
}))
import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import { requireAuth, NotAutherizedError, catchAsync } from '@quickhire/common'
import { uploadResume } from '../middleware/upload-resume'
import { Applications } from '../model/ApplicationModel'
const router = express.Router()

router.post('/api/jobs/apply-job/:jobId',requireAuth,uploadResume,catchAsync(async(req:Request,res:Response)=>{
    const { jobId } = req.params;
    const currentUser = req.currentUser;
    const {
        email,
        recruiterName,
        recruiter,
        phone,
        resume,
    } = req.body;
    
    if(!currentUser){
        throw new NotAutherizedError();
    }
    
    const newApplication = await Applications.create({
        recruiterName,
        recruiter,
        job:jobId,
        resume,
        email,
        phone,
        applicant:currentUser._id,
    });

    console.log(newApplication);

    res.status(200).json({
        status:'success',
        application:newApplication
    })
}))
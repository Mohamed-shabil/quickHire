import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import { requireAuth, NotAutherizedError, catchAsync } from '@quickhire/common'
import { uploadResume } from '../middleware/upload-resume'
import { Applications } from '../model/ApplicationModel'
const router = express.Router()

router.post('/api/jobs/apply-job/:jobId',requireAuth,uploadResume,[
    body('email')
        .notEmpty()
        .withMessage("Email can't be empty"),
    body('recruiterName')
        .notEmpty()
        .withMessage("Recruiter name can't be empty"),
    body('recruiter')
        .notEmpty()
        .withMessage("Recruiter ID can't be empty"),
    body('phone')
        .notEmpty()
        .withMessage("Phone number can't be empty"),
    body('resume')
        .notEmpty()
        .withMessage("Resume can't be empty")
],catchAsync(async(req:Request,res:Response)=>{
    const { jobId } = req.params;
    const currentUser = req.currentUser;
    const {
        email,
        recruiter,
        phone,
        resume,
    } = req.body;
    
    if(!currentUser){
        throw new NotAutherizedError();
    }
    
    const newApplication = await Applications.create({
        applicantId:currentUser._id,
        email,
        jobId:jobId,
        phone,
        recruiter,
        resume
    });

    console.log(newApplication);

    res.status(200).json({
        status:'success',
        application:newApplication
    })
}))


export {router as applicantJobRouter}
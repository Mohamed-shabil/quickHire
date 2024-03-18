import { Jobs } from "../model/JobsModel"
import express,{Request,Response} from 'express';
import catchAsync from '../utils/catchAsync'
import { isRecruiter, requireAuth, NotAutherizedError, validateRequest} from "@quickhire/common";
import { uploadCompanyImage } from '../middleware/upload'
import { body } from "express-validator";


const router = express.Router();
router.post('/api/jobs/createjobs',requireAuth,isRecruiter,uploadCompanyImage,[
  body('title')
    .notEmpty()
    .withMessage("Title can't be empty"),
  body('company')
    .notEmpty()
    .withMessage("Company Name can't be Empty"),
  body('workplace')
    .notEmpty()
    .withMessage("Work Place can't be empty"),
  body('employmentType')
    .notEmpty()
    .withMessage("Employment Type Can't be empty"),
  body('jobDescription')
    .notEmpty()
    .withMessage("job description can't be empty"),
  body('skills')
    .notEmpty()
    .withMessage("skills can't empty"),
  body('minSalary')
    .notEmpty()
    .withMessage("Minimum Salary Can't be empty"),
  body('maxSalary')
    .notEmpty()
    .withMessage("Maximum Salary Can't be empty"),
  validateRequest
],catchAsync( async (req:Request,res:Response)=>{
    console.log('Im reaching ....',req.body)
    const {
        title,
        company, 
        workplace, 
        employmentType, 
        jobDescription,
        requirements,
        skills,
        minSalary, 
        maxSalary
    } = req.body;

    const currentUser = req.currentUser;

    if(!currentUser){
      throw new NotAutherizedError()
    }
    const file = req.file as Express.MulterS3.File | undefined

    const newJob = await Jobs.create({
      recruiter: currentUser._id,
      recruiterName:currentUser.name,
      title,
      company,
      workPlace:workplace,
      employmentType,
      requirements,
      jobDescription,
      skills,
      minSalary,
      maxSalary,
      companyImage: file?.location
    });
    
    await newJob.save();

    res.status(201).json({
      status:'success',
      job:newJob
    })

}))

export {router as createJobRoute}

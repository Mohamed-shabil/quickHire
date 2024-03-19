import express,{Request, Response} from 'express'
import { requireAuth, catchAsync, isRecruiter, validateRequest, NotAutherizedError, BadRequestError } from '@quickhire/common';
import { body } from 'express-validator'
import { Jobs } from '../model/JobsModel';


const router = express.Router();

router.patch('/api/jobs/edit/:id',requireAuth, isRecruiter,[
    body('title')
        .notEmpty()
        .withMessage(" Title Can't be empty"),
    body('company')
        .notEmpty()
        .withMessage("Company Name can't be empty"),
    body('companyImage')
        .optional()
        .notEmpty()
        .withMessage("Company logo can't be empty"),
    body('workPlace')
        .notEmpty()
        .withMessage("Work Place can't be empty"),
    body("employmentType")
        .notEmpty()
        .withMessage("Employment type can't be empty"),
    body('skills')
        .notEmpty()
        .withMessage("Skills Can't be Empty"),
    body('minSalary')
        .notEmpty()
        .withMessage("Minimum Salary can't be empty"),
    body('maxSalary')
        .notEmpty()
        .withMessage("Max Salary can't be empty"),
    validateRequest
],catchAsync(async (req:Request,res:Response) =>{
    const currentUser = req.currentUser
    const {jobId} = req.params;

    const {
        title,
        company,
        companyImage,
        workPlace,
        employmentType,
        jobDescription,
        requirements,
        skills,
        minSalary,
        maxSalary
    } = req.body

    if(!currentUser){
        throw new NotAutherizedError();
    }

    if(!jobId){
        throw new BadRequestError('job ID is not valid')
    }
    const job = await Jobs.findOne({where:{_id:jobId}});

    if(!job){
        throw new BadRequestError('job post with this ID is not found')
    }

    job.set({
        company : company,
        companyImage:companyImage,
        workPlace: workPlace,
        employmentType:employmentType,
        jobDescription:jobDescription,
        requirements:requirements,
        skills:skills,
        minSalary:minSalary,
        maxSalary:maxSalary
    })

    res.status(200).json({
        status:'success',
        job
    })

}))
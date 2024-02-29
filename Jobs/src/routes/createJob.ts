import { Jobs } from "../model/JobsModel"
import express,{Request,Response} from 'express';
import catchAsync from '../utils/catchAsync'
import  multer2,{Multer} from 'multer'
import { isRecruiter, requireAuth} from "@quickhire/common";

const router = express.Router();


// [
//     body('title')
//         .notEmpty()
//         .withMessage("Title Can't be empty"),
//     body('company')
//         .notEmpty()
//         .withMessage("Company Name can't be empty"),
//     body('workPlace')
//         .notEmpty()
//         .withMessage("Work place type can't be empty"),
//     body('employmentType')
//         .notEmpty()
//         .withMessage("Employment Type can't be empty"),
//     body('jobDescription')
//         .notEmpty()
//         .withMessage("Job Description can't be empty"),
//     body('requirments')
//         .notEmpty()
//         .withMessage("Job Description can't be empty"),
//     body('skills')
//         .isArray()
//         .notEmpty()
//         .withMessage("Skills can't be empty"),
//     body('minSalary')
//         .notEmpty()
//         .withMessage("Minimum Salary can't be empty"),
//     body('maxSalary')
//         .notEmpty()
//         .withMessage("MaxSalary Salary can't be empty"),
//     validateRequest
// ]

const storage= multer2.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); 
  }
});

const upload = multer2({ storage: storage });


router.post('/api/jobs/createjobs',requireAuth,isRecruiter,upload.single('companyImage'),catchAsync( async (req:Request,res:Response)=>{
    console.log('Im reaching ....',req.body)
    const {
        title, 
        company, 
        workPlace, 
        employmentType, 
        jobDescription,
        requirements,
        skills,
        minSalary, 
        maxSalary
    } = req.body;

    const newJob = new Jobs({
        recruiter:req.currentUser?._id,
        title,
        company,
        workPlace,
        employmentType,
        requirements,
        jobDescription,
        skills,
        minSalary,
        maxSalary
    })
    
    await newJob.save();

    res.status(201).json({
        status:'success',
        job:newJob
    })

}))

export {router as createJobRoute}

function multer(arg0: { storage: any; }) {
    throw new Error("Function not implemented.");
}

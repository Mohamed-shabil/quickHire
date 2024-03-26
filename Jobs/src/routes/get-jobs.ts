import express,{Request,Response} from 'express'
import { isRecruiter, catchAsync, requireAuth} from '@quickhire/common';
import { Jobs } from '../model/JobsModel';
const router = express.Router();

router.get('/api/jobs/:recruiter/get-jobs',requireAuth,isRecruiter,catchAsync(async(req:Request,res:Response)=>{
    const recruiter = req.params.recruiter;
    console.log(recruiter);

    const jobs = await Jobs.findAll({
        where:{
            recruiterName:recruiter
        }
    });
    
    console.log(jobs);
    res.status(200).json({
        status:'success',
        jobs
    })
}));

export {router as getMyAlljobs}
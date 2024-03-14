import express,{Request,Response} from 'express'
import { isRecruiter, catchAsync, requireAuth} from '@quickhire/common';
import { Jobs } from '../model/JobsModel';
const router = express.Router();

router.get('/api/jobs/:id/getAll',requireAuth,isRecruiter,catchAsync(async(req:Request,res:Response)=>{
    const recruiterId = req.params.id;
    console.log(recruiterId);

    const jobs = await Jobs.find({recruiter:recruiterId});
    
    console.log(jobs);
    
    res.status(200).json({
        status:'status',
        jobs
    })
}));

export {router as getMyAlljobs}
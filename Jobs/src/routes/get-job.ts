import express,{Request,Response} from 'express'
import { isRecruiter, catchAsync, requireAuth} from '@quickhire/common';
import { Jobs } from '../model/JobsModel';
const router = express.Router();

router.get('/api/jobs/:id',requireAuth,catchAsync(async(req:Request,res:Response)=>{
    
    const jobId = req.params.id;
    console.log('job Id is here -----',jobId)
    const job = await Jobs.findOne({
        where:{
            _id:jobId
        }
    });
    
    console.log('here is the job ....',job);
    res.status(200).json({
        status:'status',
        job
    })
}));

export {router as getOneJob}
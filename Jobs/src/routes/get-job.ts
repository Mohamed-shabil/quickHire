import express,{Request,Response} from 'express'
import { isRecruiter, catchAsync, requireAuth} from '@quickhire/common';
import { Jobs } from '../model/JobsModel';
const router = express.Router();

router.get('/api/jobs/:id',requireAuth,catchAsync(async(req:Request,res:Response)=>{
    const jobId = req.params.id;
    const job = await Jobs.findOne({
        where:{
            _id:jobId
        }
    });
    res.status(200).json({
        status:'status',
        job
    })
}));

export {router as getOneJob}
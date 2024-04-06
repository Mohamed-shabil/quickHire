import express,{ Request, Response } from 'express';
import { requireAuth, isRecruiter, catchAsync, NotAutherizedError } from '@quickhire/common'
import { Jobs } from '../model/JobsModel';
import { Applications } from '../model/ApplicationModel';

const router = express.Router();

router.delete('/api/jobs/:jobId/delete-job',requireAuth,isRecruiter,catchAsync(async(req:Request,res:Response)=>{
    const jobId = req.params.jobId;
    const recruiter = req.currentUser;

    if(!recruiter){
        throw new NotAutherizedError();
    }

    const job = await Jobs.destroy({
        where:{
            _id:jobId,
            recruiterId:recruiter._id
        }
    });

    const application = await Applications.destroy({
        where:{
            recruiter:recruiter._id,
            jobId:jobId,
        }
    });

    console.log(job,application);
    
    res.status(200).json({
        status:'success',
        job,
    })

})) 


export {router as deleteJobRouter}
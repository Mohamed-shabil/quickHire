import express,{Request, Response} from 'express'
import { BadRequestError, catchAsync, isRecruiter, requireAuth} from '@quickhire/common'
import { Jobs } from '../model/JobsModel';
const router = express.Router();

router.patch('/api/jobs/:jobId',requireAuth,isRecruiter,catchAsync(async(req:Request,res:Response)=>{

    const parseBoolean = new RegExp('true');

    const jobId = req.params.jobId;
    
    const recruiter = req.currentUser;

    const isActive = parseBoolean.test(req.query.isActive as string);

    console.log({isActive});

    const job = await Jobs.findOne({
        where:{
            _id:jobId,
            recruiterId:recruiter?._id
        }
    })
    

    if(!job){
        throw new BadRequestError("You don't have any job posted with this job ID");
    }

    job.set({
        isActive:isActive
    })

    await job.save();

    res.status(200).json({
        status:"success",
        job
    })

}))

export { router as jobActivateRouter}
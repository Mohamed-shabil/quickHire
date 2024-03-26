import express,{Request, Response} from 'express'
import { BadRequestError, catchAsync, isRecruiter, requireAuth} from '@quickhire/common'
import { Jobs } from '../model/JobsModel';
const router = express.Router();

router.patch('/api/jobs/:jobId',requireAuth,isRecruiter,catchAsync(async(req:Request,res:Response)=>{
    const parseBoolean = new RegExp('true');
    const jobId = req.params.jobId;
    const recruiter = req.currentUser;

    const isActive = parseBoolean.test(req.query.isActive as string);
    
    
    const job = await Jobs.findOne({
        where:{
            _id:jobId,
            recruiter:recruiter?._id        
        }
    });
    
    console.log('Actually Activve or not ....',isActive);

    if(!job){
        throw new BadRequestError("You don't have any job posted with this job ID");
    }

    job.set({
        isActive:isActive
    })

    await job.save();

    console.log('isActive from db',job.dataValues.isActive)
    res.status(200).json({
        status:"success",
        job
    })

}))

export { router as jobActivateRouter}
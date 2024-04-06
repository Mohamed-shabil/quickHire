import { BadRequestError, NotAutherizedError, catchAsync, isRecruiter, requireAuth } from '@quickhire/common';
import express,{Request,Response} from 'express';
import { body } from 'express-validator'
import { Applications } from '../model/ApplicationModel';
import { User } from '../model/UsersModel';
import { Jobs } from '../model/JobsModel';
const router = express.Router();

router.patch('/api/jobs/application/change-status',requireAuth,isRecruiter,[
    body('jobId')
        .notEmpty()
        .withMessage("jobId can't be empty"),
    body('status')
        .notEmpty()
        .withMessage("status can't be empty")
],catchAsync(async(req:Request,res:Response)=>{
    const {jobId, status} = req.body;
    const currentUser = req.currentUser;
    console.log('Job Id is here ....',jobId);
    if(!currentUser){
        throw new NotAutherizedError();
    }

    const applicantion = await Applications.findOne({
        where:{
            recruiter:currentUser._id,
            jobId:jobId,
        },
        include:[
            {
                model:User,
                as:'owner'
            },
        ],
    });


    if(!applicantion){
        throw new BadRequestError('No job with this job ID')
    }

    applicantion.set({
        status:status
    });

    await applicantion.save();

    console.log('application is here ',applicantion);
    res.status(200).json({
        status:'success',
        applicantion
    });
}))


export { router as changeApplicationStatus}
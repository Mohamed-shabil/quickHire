import express,{NextFunction, Request,Response, application} from 'express'
import { requireAuth, isRecruiter, catchAsync, NotAutherizedError, currentUser} from '@quickhire/common'
import {Applications} from '../model/ApplicationModel'
import { User } from '../model/UsersModel';

const router = express.Router();
router.use((req:Request,res:Response,next:NextFunction)=>{
    console.log('Current User',req.currentUser);
    next();
});
router.get('/api/jobs/:jobId/get-applicants',requireAuth,isRecruiter,catchAsync(async(req:Request,res:Response)=>{
    console.log('Not working ....')
    const jobId = req.params.jobId;
    const currentUser = req.currentUser;
    if(!currentUser){
        throw new NotAutherizedError();
    }

    const applicants = await Applications.findAll({
        where:{
            job:jobId,
            recruiter:currentUser._id
        },
        include: [{ model: User, as: 'owner' }]
    });

    const applications = applicants.map((applicant)=>applicant.dataValues);

    console.log(applications);

    res.status(200).json({
        status:'success',
        applications
    })
}))

export { router as getApplicantsRouter}
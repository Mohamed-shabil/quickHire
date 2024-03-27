import { catchAsync, requireAuth } from '@quickhire/common';
import express, { Request, Response} from 'express'
import { User } from '../model/UsersModel';
import { Applications } from '../model/ApplicationModel';

const router = express.Router();

router.get('/api/jobs/applied-jobs/:userId',requireAuth,catchAsync(async(req:Request,res:Response)=>{
    const userId = req.params.userId;
    
    const applications = await Applications.findAll({
        where: {
            applicantId:userId
        }
    });
    console.log(applications);
    res.status(200).json({
        status:'success',
        applications
    });
    
}))


export {router as appliedJobsRouter}
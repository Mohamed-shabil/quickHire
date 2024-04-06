import { BadRequestError, NotAutherizedError, catchAsync, requireAuth } from '@quickhire/common';
import express, { Request, Response} from 'express'
import { User } from '../model/UsersModel';
import { Applications } from '../model/ApplicationModel';
import { Jobs } from '../model/JobsModel';
import sequelize from 'sequelize';

const router = express.Router();

router.get('/api/jobs/applied-jobs',requireAuth,catchAsync(async(req:Request,res:Response)=>{
    const currentUser = req.currentUser;
    
    if(!currentUser){
        throw new NotAutherizedError();
    }

    
    const applications = await Applications.findAll({
        where: {
            applicantId:currentUser._id
        },
        include:{
            model:Jobs,
            as:'job',
        },

    });
    console.log('application is here ',applications);
    res.status(200).json({
        status:'success',
        applications
    });
    
}))


export {router as appliedJobsRouter}
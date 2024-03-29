import express,{Request,Response} from 'express'
import { isRecruiter, catchAsync, requireAuth, NotAutherizedError} from '@quickhire/common';
import { Jobs } from '../model/JobsModel';
import { sequelize } from '../config/config';
const router = express.Router();

router.get('/api/jobs/:id',requireAuth,catchAsync(async(req:Request,res:Response)=>{
    const jobId = req.params.id;
    const currentUser = req.currentUser;
    if(!currentUser){
        throw new NotAutherizedError();
    }
    const job = await Jobs.findOne({
        where: { _id: jobId },
        attributes: {
            include: [
              [sequelize.literal(`(
                SELECT "createdAt"
                FROM "Applications"
                WHERE "Applications"."jobId" = "Job"."_id" AND "Applications"."applicantId" = '${currentUser._id}'
                ORDER BY "createdAt" DESC
                LIMIT 1
              )`), 'appliedAt']
            ]
         },
         raw: true // This will return plain objects instead of model instances
    });

    console.log('Current Job',job);
    res.status(200).json({
        status:'status',
        job
    })
}));

export {router as getOneJob}
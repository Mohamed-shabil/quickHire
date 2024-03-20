import express,{Request, Response} from 'express'
import { requireAuth } from '@quickhire/common'
import catchAsync from '../utils/catchAsync';
import { Op } from 'sequelize';
import { Jobs } from '../model/JobsModel';
const router = express.Router();



router.get('/api/jobs/search-job',requireAuth,catchAsync(async(req:Request, res:Response)=>{
    const { minExp, maxExp, location } = req.query;

    const filter:any = {}

    if(minExp && maxExp){
        filter.experience = {
            [Op.between]: [minExp, maxExp]
        };
    }else if(minExp){
        filter.experience = {
            [Op.gte]: minExp
        }
    }else if(maxExp){
        filter.experience = {
            [Op.lte]:maxExp
        }
    }

    if(location){
        filter.location = {
            [Op.like]:`%${location}`
        }
    }

    const jobs = await Jobs.findAll({
        where: Object.keys(filter).length > 0 ? filter : undefined,
        attributes:[
            '_id',
            'title',
            'companyImage',
            'company',
            'workPlace',
            'employmentType',
            'skills',
            'minSalary',
            'maxSalary'
        ]
    });

    console.log('All Jobs',jobs);

    res.status(200).json({
        status:'success',
        jobs
    })


}))

export {router as searchRouter}
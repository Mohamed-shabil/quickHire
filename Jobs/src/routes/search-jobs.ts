import express,{Request, Response} from 'express'
import { requireAuth } from '@quickhire/common'
import catchAsync from '../utils/catchAsync';
import { Op } from 'sequelize';
import { Jobs } from '../model/JobsModel';
const router = express.Router();



router.get('/api/jobs/search-job',requireAuth,catchAsync(async(req:Request, res:Response)=>{
    const { experience, location, title } = req.query;

    const filter:any = {}
   
    if(location){
        filter.location = {
            [Op.like]:`%${location}`
        }
    }
    if(experience){
        filter.experience = experience
    }
    if(title){
        filter.title = {
            [Op.like]:`%${title}`
        }

        filter.company = {
            [Op.like]:`%${title}`
        }

        filter.employmentType ={
            [Op.like]:`%${title}`
        }

        filter.jobDescription ={
            [Op.like]:`%${title}`
        }

        filter.requirements = {
            [Op.like]:`%${title}`
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
            'maxSalary',
            'location',
            'experience',
            'openings'
        ]
    });


    res.status(200).json({
        status:'success',
        jobs
    })


}))

export {router as searchRouter}
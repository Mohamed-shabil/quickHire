import express,{Request, Response} from 'express'
import { setFileName, uploadResume } from '../middleware/upload-resume'
import { BadRequestError, NotAutherizedError, catchAsync, requireAuth } from '@quickhire/common';
import { User } from '../model/UsersModel'
import { Resume } from '../model/ResumeModel';
const router = express.Router();

router.post('/api/jobs/upload-resume',requireAuth,setFileName,uploadResume,catchAsync(async(req:Request,res:Response)=>{

    const file = req.file as Express.MulterS3.File | undefined;
    const currentUser = req.currentUser

    if(!currentUser){
        throw new NotAutherizedError();
    }
    
    if(!file){
        throw new BadRequestError('Resume is not provided');
    }
    
    const newResume = file.location;

    console.log(newResume)


    const resume = await Resume.create({
        fileName:'Shabil',
        url:newResume,
        user:currentUser._id
    });
    console.log('RESUME :- ',resume.dataValues);
    const user = await User.findOne({
        where:{
            _id:currentUser._id
        },
        include:[{
            model:Resume,
            as:'resume'
        }]
    })

    console.log('User with Data',user?.dataValues);


    res.status(201).json({
        status:'success',
        user:user?.dataValues
    });
}))


export {router as uploadResumeRouter}
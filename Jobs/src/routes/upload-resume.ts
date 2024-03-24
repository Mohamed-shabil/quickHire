import express,{Request, Response} from 'express'
import { uploadResume } from '../middleware/upload-resume'
import { BadRequestError, NotAutherizedError, catchAsync, requireAuth } from '@quickhire/common';
import { User } from '../model/UsersModel'
import { Resume } from '../model/ResumeModel';
const router = express.Router();

router.post('/api/jobs/upload-resume',requireAuth,uploadResume,catchAsync(async(req:Request,res:Response)=>{

    const file = req.file as Express.MulterS3.File | undefined;

    console.log('uploaded file',file)
    const currentUser = req.currentUser

    if(!currentUser){
        throw new NotAutherizedError();
    }
    
    if(!file){
        throw new BadRequestError('Resume is not provided');
    }
    

    const resume = await Resume.create({
        fileName: file.originalname,
        url:file.location,
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
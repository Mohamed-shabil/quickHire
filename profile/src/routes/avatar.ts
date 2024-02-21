import express,{Request,Response} from 'express';
import {BadRequestError, NotAutherizedError, requireAuth} from '@quickhire/common'
import catchAsync from '../utils/catchAsync'
import {Profile} from '../model/profile';
import { ImageConverter,uploadProfie } from '../middleware/profileUpload';
const router = express.Router();

router.patch('/api/profile/avatar',requireAuth,ImageConverter,uploadProfie,catchAsync(async(req:Request,res:Response)=>{
    if(!req.file){
        throw new BadRequestError('No File is uploaded');
    }
    const fileWithLocation = req.file as Express.MulterS3.File
    const fileLocation = fileWithLocation.location; 
    console.log(fileWithLocation);
    const profile = await Profile.findOne({userId:req.currentUser?._id});
    if(!profile){
        throw new NotAutherizedError();
    }
    profile.avatar = fileLocation;
    await profile.save()
    return res.status(200).json({
        status:'Success',
        profile
    })
}))


export {router as avatarRouter}
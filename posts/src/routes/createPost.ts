import express,{Request,Response} from 'express';
import {BadRequestError, NotAutherizedError, requireAuth} from '@quickhire/common'
import catchAsync from '../utils/catchAsync'
import { Posts } from '../model/postModel';
import { body, validationResult} from 'express-validator';
import { ImageConverter,uploadProfie } from '../middleware/upload';


const router = express.Router();

interface fileLocations{
    url:string;
}
router.post('/api/posts/create',ImageConverter,uploadProfie,catchAsync(async(req:Request,res:Response)=>{
   

    const filesWithLocation = req.files as Express.MulterS3.File[]

    const fileLocations: fileLocations[] = [];

    filesWithLocation.forEach((file, index) => {
        const fileLocation = file.location;
        fileLocations.push({url:fileLocation})
    });
    console.log(fileLocations);
    
    const post = await new Posts({
        creatorId:req.currentUser?._id,
        ...(req.body.caption && {caption:req.body.caption}),
        ...(fileLocations.length && {media:fileLocations})
    })
    await post.save();
    return res.status(200).json({
        status:'Success',
        post,
    })
}))


export {router as createPostRoute}
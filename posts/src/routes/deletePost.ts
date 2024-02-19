import express,{Request,Response} from 'express';
import {BadRequestError, NotAutherizedError, requireAuth, validateRequest} from '@quickhire/common'
import catchAsync from '../utils/catchAsync'
import { Posts } from '../model/postModel';
import { body, validationResult} from 'express-validator';

const router = express.Router();

router.patch('/api/posts/delete/:id',catchAsync(async(req:Request,res:Response)=>{
    console.log(req.body.caption)
    const error = validationResult(req);
    const { id } = req.params;
    const post = await Posts.findOneAndDelete({_id:id,creatorId:req.currentUser?._id});
    console.log(post);
    return res.status(200).json({
        status:'Success',
        post:null
    })
}))


export {router as editPostRouter}
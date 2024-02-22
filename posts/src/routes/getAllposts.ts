import express,{Request,Response} from 'express';
import {BadRequestError, NotAutherizedError, requireAuth, validateRequest} from '@quickhire/common'
import catchAsync from '../utils/catchAsync'
import { Posts } from '../model/postModel';
const router = express.Router();

router.get('/api/posts/show',catchAsync(async(req:Request,res:Response)=>{
    const posts = await Posts.find().populate('creatorId');
    console.log('ALL POSTS',posts)
    return res.status(200).json({
        status:'Success',
        post:posts
    })
}))


export {router as getAllPosts}
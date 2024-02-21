import express,{Request,Response} from 'express';
import {BadRequestError, NotAutherizedError, requireAuth, validateRequest} from '@quickhire/common'
import catchAsync from '../utils/catchAsync'
import { Posts } from '../model/postModel';
const router = express.Router();

router.get('/api/posts/myPosts',catchAsync(async(req:Request,res:Response)=>{
    const posts = await Posts.find({creatorId:req.currentUser?._id});
    console.log(posts)
    return res.status(200).json({
        status:'Success',
        post:posts
    })
}))


export {router as myPostsRoute}
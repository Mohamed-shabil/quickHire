import express,{Request,Response} from 'express';
import {BadRequestError, NotAutherizedError, requireAuth, validateRequest} from '@quickhire/common'
import catchAsync from '../utils/catchAsync'
import { Posts } from '../model/postModel';
const router = express.Router();

router.get('/api/posts/getOne/:id',catchAsync(async(req:Request,res:Response)=>{
    const id = req.params.id;
    const post = await Posts.findById(id);
    if(!post){
        throw new BadRequestError('No post with this ID found');
    }
    console.log(post)
    return res.status(200).json({
        status:'Success',
        post:post
    })
}))

export {router as getOnePost}
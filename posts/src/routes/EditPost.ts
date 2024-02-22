import express,{Request,Response} from 'express';
import {BadRequestError,requireAuth, validateRequest} from '@quickhire/common'
import catchAsync from '../utils/catchAsync'
import { Posts } from '../model/postModel';
import { body, validationResult} from 'express-validator';

const router = express.Router();

router.patch('/api/posts/edit/:id',catchAsync(async(req:Request,res:Response)=>{
    console.log(req.body.caption)
    const error = validationResult(req);
    const { id } = req.params;
    const post = await Posts.findById(id);
    if(!post){
        throw new BadRequestError('The post with this ID Is does not exit');
    }

    post.caption = req.body.caption;

    await post.save();
    return res.status(200).json({
        status:'Success',
        post,
    })
}))


export {router as editPostRouter}
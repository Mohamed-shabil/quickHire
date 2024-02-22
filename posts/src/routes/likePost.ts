import express,{Request,Response} from 'express';
import { body,validationResult} from 'express-validator';
import catchAsync from '../utils/catchAsync';
import { requireAuth, validateRequest,BadRequestError,NotFoundError } from '@quickhire/common'
import {Posts} from '../model/postModel'
const router = express.Router();

router.patch('/api/posts/likePost',requireAuth,[
    body('postId')
        .isMongoId()
        .notEmpty()
        .withMessage("Post ID required"),
        validateRequest
],catchAsync(async(req:Request,res:Response)=>{
    const errors = validationResult(req);
    const {postId} = req.body;
    const post = await Posts.findById(postId);
    if(!post){
        throw new NotFoundError('Post with this ID not Found')
    }
    post.likes.push({userId:req.currentUser?._id});
    post.likesCount = post.likesCount+1;
    await post.save(); 
    return res.status(200).json({
        status:"success",
        likesCount:post.likesCount
    })
}))

export {router as likePostRouter}
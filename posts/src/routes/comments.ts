import express,{Request,Response} from 'express';
import { body,validationResult} from 'express-validator';
import catchAsync from '../utils/catchAsync';
import { requireAuth, validateRequest,BadRequestError,NotFoundError } from '@quickhire/common'
import {Posts} from '../model/postModel'
import { Comments } from '../model/commentModel';
const router = express.Router();

router.patch('/api/posts/comments',requireAuth,[
    body('postId')
        .isMongoId()
        .notEmpty()
        .withMessage("Post ID required"),
    body('comment')
        .notEmpty()
        .withMessage("Comment can't be Empty"),
        validateRequest
],catchAsync(async(req:Request,res:Response)=>{
    const errors = validationResult(req);
    console.log('working here')
    const {postId,comment} = req.body;
    console.log('postId -----',postId)
    const post = await Posts.findById(postId);
    if(!post){
        throw new NotFoundError('Post with this ID not Found')
    }
    
    await Comments.create({
        post:postId,
        user:req.currentUser?._id,
        comment,
    })
    const commentCount = await Comments.countDocuments({post:postId});  

    return res.status(200).json({
        status:"success",
        comment:commentCount
    })
}))

export {router as commentRouter}
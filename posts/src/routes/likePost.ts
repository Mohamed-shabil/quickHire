import express,{Request,Response} from 'express';
import { body,validationResult} from 'express-validator';
import catchAsync from '../utils/catchAsync';
import { requireAuth, validateRequest,BadRequestError,NotFoundError } from '@quickhire/common'
import {Posts} from '../model/postModel'
import { Likes } from '../model/likesModel';

const router = express.Router();

router.post('/api/posts/likePost',requireAuth,[
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

    const isUserLiked = await Likes.findOne({user:req.currentUser?._id,post:postId});

    if(isUserLiked){
        await Likes.deleteOne({user:req.currentUser?._id,post:postId});
        return res.status(200).json({
            status:'success',
            like:null
        });
    }

    const like = await Likes.create({
        user : req.currentUser?._id,
        post:postId,
    });

    return res.status(200).json({
        status:"success",
        like
    })
}))

export {router as likePostRouter}
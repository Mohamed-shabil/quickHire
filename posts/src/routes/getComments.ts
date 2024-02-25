import express,{Request,Response} from 'express';
import catchAsync from '../utils/catchAsync';
import { requireAuth, NotFoundError } from '@quickhire/common'
import { Posts } from '../model/postModel'
import { Comments } from '../model/commentModel';

const router = express.Router();

router.get('/api/posts/comments/:postId',requireAuth,catchAsync(async(req:Request,res:Response)=>{
    const {postId} = req.params;
    console.log(postId);
    const post = await Posts.findById(postId)

    if(!post){
        throw new NotFoundError('Post with this ID not Found')
    }
    const page = req.body?.page*1 || 1;
    const limit = 4;
    const skip = (page - 1) * limit;
    
    const comment = await Comments.find({post:postId}).sort({createdAt:-1}).skip(skip).limit(limit).populate('user')
    return res.status(200).json({
        status:"success",
        comment:comment,
        commentCount:comment.length,
        page
    })
}))

export {router as getAllComments}
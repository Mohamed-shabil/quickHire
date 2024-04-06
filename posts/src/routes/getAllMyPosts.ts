import express,{Request,Response} from 'express';
import mongoose from 'mongoose'
import {BadRequestError, NotAutherizedError, requireAuth, validateRequest} from '@quickhire/common'
import catchAsync from '../utils/catchAsync'
import { Posts } from '../model/postModel';
const router = express.Router();

router.get('/api/posts/myPosts',catchAsync(async(req:Request,res:Response)=>{
    const currentUser = req.currentUser
    if(!currentUser){
        throw new NotAutherizedError();
    }
    const posts = await Posts.aggregate([
        {
            $match:{
                creatorId: new mongoose.Types.ObjectId(currentUser._id)
            }
        },
        {
            $lookup: {
              from: "likes",
              localField: "_id",
              foreignField: "post",
              as: "likes"
            }
         },
         {
            $lookup: {
              from: "follow",
              localField: "creatorId",
              foreignField: "follow",
              as: "followers"
            }
         },
         {
            $lookup: {
              from: "users",
              localField: "creatorId",
              foreignField: "_id",
              as: "creator"
            }
         },
         {
            $addFields: {
              isLikedByCurrentUser: {
                $in: [currentUser, "$likes.user"]
              },
              isFollowedByCurrentUser: {
                $in: [currentUser,"$followers.followedBy"]
              },
              totalLikes: { $size: "$likes" }
            }
         },
         {
            $project: {
              likes: 0,
              followers: 0
            }
         },
         {
            $sort: { createdAt: -1 }
         }
    ]);
    console.log(posts)
    return res.status(200).json({
        status:'Success',
        posts:posts
    })
}))


export {router as myPostsRoute}
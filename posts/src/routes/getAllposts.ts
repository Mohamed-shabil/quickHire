import express,{Request,Response} from 'express';
import {BadRequestError, NotAutherizedError, currentUser, requireAuth, validateRequest} from '@quickhire/common'
import catchAsync from '../utils/catchAsync'
import { Posts } from '../model/postModel';
import mongoose from 'mongoose';
const router = express.Router();

router.get('/api/posts/show',catchAsync(async(req:Request,res:Response)=>{
    const currentUser = req.currentUser?._id;
    const posts = await Posts.aggregate([
        {
            $match:{}
        },
        {
            $lookup:{
                from:'likes',
                let:{postId:'$_id',currentUser:new mongoose.Types.ObjectId(currentUser)},
                pipeline:[
                    {
                        $match:{
                            $expr:{
                                $and:[
                                    {$eq:['$post','$$postId']},
                                    {$eq:['$user','$$currentUser']}
                                ]
                            }
                        }
                    },
                    {
                        $project:{
                            _id:0,
                            liked:{$literal:true}
                        }
                    }
                ],
                as: 'likes'
            },
        },
        {
            $addFields:{
                liked:{$cond:{if:{$gt:[{$size:'$likes'},0]},then:true,else:false}}
            }
        },
        {
            $lookup: {
                from: 'users', 
                localField: 'creatorId', 
                foreignField: '_id',
                as: 'creator'
            }
        },
        {
            $unwind: '$creator'
        }

    ])

    console.log('ALL POSTS',posts)
    return res.status(200).json({
        status:'Success',
        post:posts
    })
}))


export {router as getAllPosts}



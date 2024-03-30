import express,{Response,Request} from 'express'
import catchAsync from '../utils/catchAsync';
import {Profile} from '../model/profile';
import {NotAutherizedError, requireAuth} from '@quickhire/common'
import { Follow } from '../model/follow';

const router = express.Router();

router.get('/api/profile/:username',requireAuth,catchAsync(async(req,res)=>{
    const username = req.params.username;
    const currentUser = req.currentUser
    console.log(username)
    

    const [ profile, followers, followings ] = await Promise.all([
        Profile.findOne({username:username}),
        Follow.countDocuments({follow:currentUser?._id}),
        Follow.countDocuments({followedBy:currentUser?._id})
    ]);

    console.log(profile)
    if(!profile){
        throw new NotAutherizedError();
    }

    return res.status(200).json({
        status:'success',
        profile:{
            profile,
            followers,
            followings
        }
    })
}))

export {router as getProfileRouter};
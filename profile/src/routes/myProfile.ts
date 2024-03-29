import express,{Response,Request} from 'express'
import catchAsync from '../utils/catchAsync';
import {Profile} from '../model/profile';
import {Follow} from '../model/follow'
import {NotAutherizedError, requireAuth} from '@quickhire/common'

const router = express.Router();

router.get('/api/profile/my-profile/:username',catchAsync(async(req,res)=>{
    const currentUser = req.currentUser;
    const username = req.params.username;
    console.log(currentUser)
    const profile = await Profile.findOne({_id:currentUser?._id})
    console.log(profile)

    const followers = await Follow.countDocuments({follow:currentUser?._id});
    const followings = await Follow.countDocuments({followedBy:currentUser});

    if(!profile){
        throw new NotAutherizedError();
    }

    return res.status(200).json({
        status:'success',
        data:{
            profile:profile,
            followers,
            followings
        }
    })
}))

export {router as myProfileRouter};
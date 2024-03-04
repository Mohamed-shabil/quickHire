import express,{Response,Request} from 'express'
import catchAsync from '../utils/catchAsync';
import {Profile} from '../model/profile';
import {NotAutherizedError, requireAuth} from '@quickhire/common'

const router = express.Router();

router.get('/api/profile/show/:username',catchAsync(async(req,res)=>{
    const currentUser = req.currentUser;
    const username = req.params.username;
    console.log(currentUser)
    const profile = await Profile.findOne({userId:currentUser?._id})
    console.log(profile)
    if(!profile){
        throw new NotAutherizedError();
    }

    return res.status(200).json({
        status:'success',
        profile:profile
    })
}))

export {router as myProfileRouter};
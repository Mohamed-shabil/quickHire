import express,{Response,Request} from 'express'
import catchAsync from '../utils/catchAsync';
import {Profile} from '../model/profile';
import {NotAutherizedError, requireAuth} from '@quickhire/common'

const router = express.Router();

router.get('/api/profile/:username',requireAuth,catchAsync(async(req,res)=>{
    const username = req.params.username;
    console.log(username)
    const profile = await Profile.findOne({username:username})
    
    console.log(profile)
    if(!profile){
        throw new NotAutherizedError();
    }

    return res.status(200).json({
        status:'success',
        profile:profile
    })
}))

export {router as getProfileRouter};
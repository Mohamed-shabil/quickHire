import express,{Response,Request} from 'express'
import catchAsync from '../utils/catchAsync';
import {Profile} from '../model/profile';
import {requireAuth} from '@quickhire/common'

const router = express.Router();

router.use(requireAuth);

router.get('/api/profile/show',catchAsync(async(req,res)=>{
    const currentUser = req.currentUser;
    const profile = await Profile.findOne({userId:currentUser?._id});
    console.log(profile);
    return res.status(200).json({
        status:'success',
        profile:profile
    })
}))

export {router as profileRouter};
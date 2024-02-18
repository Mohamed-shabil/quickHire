import express,{Request,Response} from 'express';
import {NotAutherizedError, requireAuth, validateRequest} from '@quickhire/common'
import catchAsync from '../utils/catchAsync';
import { body, validationResult } from 'express-validator'
import { Profile } from '../model/profile'
export const router = express.Router();



router.post('/api/profile/about',requireAuth,[
    body('fullName')
        .notEmpty()
        .withMessage("Fist Name can't be empty"),
    body('bio')
        .isLength({min:20})
        .withMessage('About Section Must be 20 to 150 characters long'),
    body('headline')
        .notEmpty()
        .withMessage("Headline can't be empty"),
    validateRequest,
],catchAsync(async(req:Request,res:Response)=>{
    const error = validationResult(req);
    const {fullName, bio, headline} = req.body;
    const userProfile = await Profile.findOne({userId:req.currentUser?._id})
    
    if(!userProfile){
        throw new NotAutherizedError();
    }
    userProfile.fullName = fullName;
    userProfile.headline = headline;
    userProfile.bio = bio;
    
    await userProfile.save();
    
    return res.status(200).json({
        status:'success',
        profile:userProfile
    });
}))



export {router as aboutRouter}
import express,{Request,Response} from 'express';
import { body, validationResult} from 'express-validator'
import { 
    BadRequestError, 
    NotAutherizedError, 
    requireAuth, 
    validateRequest
} from '@quickhire/common';
import catchAsync from '../utils/catchAsync';
import { Profile } from '../model/profile';

const router = express.Router();

router.post('/api/profile/followers/follow',[
    body('followerId')
        .notEmpty()
        .isMongoId()
        .withMessage('Invalid Mongo ID'),
    validateRequest,
],catchAsync(async(req:Request,res:Response)=>{
    const error = validationResult(req);
    const { followerId } = req.body;
    const user = await Profile.findOne({userId:req.currentUser?._id});
    if(!user){
        throw new NotAutherizedError();
    }
    user.following.push(followerId);
    await user.save();

    return res.status(200).json({
        status:'success',
        followings : user.following,
        followingCount : user.following.length
    });
}))

router.post('/api/profile/followers/unfollow',[
    body('followerId')
        .notEmpty()
        .isMongoId()
        .withMessage('Invalid Mongo ID'),
    validateRequest,
],catchAsync(async(req:Request,res:Response)=>{
    const error = validationResult(req);
    const {followerId} = req.body;
    const user = await Profile.findOne({userId:req.currentUser?._id});
    if(!user){
        throw new NotAutherizedError();
    }
    
    const indexOfFollower = user.following.indexOf(followerId);
    if(indexOfFollower === -1){
        throw new BadRequestError('Profile is not currently being followed');
    }
    user.following.splice(indexOfFollower,1);

    await user.save();
    return res.status(200).json({
        status:'success',
        followings : user.following
    });
}));

router.get('/api/profile/getFollowers',catchAsync(async(req:Request,res:Response)=>{
    const user = await Profile.findOne({userId:req.currentUser?._id});
    if(!user){
        throw new NotAutherizedError();
    }
    return res.status(200).json({
        status:'success',
        following:user.following,
        followingsCount:user.following.length
    });
}))


export {router as followingRoute}
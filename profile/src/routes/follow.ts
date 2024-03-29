import express,{Request,Response} from 'express';
import { body, validationResult} from 'express-validator'
import { 
    BadRequestError, 
    KafkaProducer, 
    NotAutherizedError, 
    requireAuth, 
    validateRequest
} from '@quickhire/common';
import catchAsync from '../../../posts/src/utils/catchAsync';
import { Profile } from '../model/profile';
import { Follow } from '../model/follow';
import { kafkaClient } from '../events/kafkaClient';

const router = express.Router();

router.post('/api/profile/followers/follow/:userId',requireAuth,catchAsync(async(req:Request,res:Response)=>{
    const error = validationResult(req);
    const { userId } = req.params;
    console.log({userId})
    const isAlreadyFollowing = await Follow.findOne({follow:userId,followedBy:req.currentUser?._id});

    if(isAlreadyFollowing){
        throw new BadRequestError('You are already following the User');
    }
    const following = new Follow({
        follow:userId,
        followedBy:req.currentUser?._id
    })
    console.log({following});
    await following.save();
    const payload = {
        follow:userId,
        followedBy:req.currentUser?._id
    }
    const response = new KafkaProducer(kafkaClient).produce('user-followed',payload);
    console.log(response);
    return res.status(201).json({
        status:'success',
        following
    });
}))

router.delete('/api/profile/followers/unfollow/:userId',requireAuth,catchAsync(async(req:Request,res:Response)=>{
    const {userId} = req.params;

    const isFollowing = await Follow.findOne({follow:userId,followedBy:req.currentUser?._id});
    if(!isFollowing){
        throw new BadRequestError('You are not Following the User to unfollow');
    }
    const unFollow = await Follow.findOneAndDelete({follow:userId,followedBy:req.currentUser?._id},{new:true});
    
    const payload = {follow:userId,followedBy:req.currentUser?._id}

    const response = new KafkaProducer(kafkaClient).produce('user-unFollowed',payload);
    console.log(response);

    return res.status(200).json({
        status:'success',
    });
}));

router.get('/api/profile/followers/getFollowings',requireAuth,[
    body('userId')
        .notEmpty()
        .isMongoId()
        .withMessage('Invalid Mongo ID'),
    validateRequest,
],catchAsync(async(req:Request,res:Response)=>{
    const {userId} = req.body;
    const user = await Profile.findOne({userId:userId});
    if(!user){
        throw new NotAutherizedError();
    }
    const userFollowings = await Follow.find({userId:userId});

    return res.status(200).json({
        status:'success',
        followings:userFollowings,
        followingsCount:userFollowings.length
    });
}))


router.get('/api/profile/followers/:userId',catchAsync(async(req:Request,res:Response)=>{
    const {userId} = req.params
    console.log('users is here ....')

    const followers = await Follow.find({follow:userId}).populate('follow');
    
    console.log('userFollowings',followers);
    return res.status(200).json({
        status:'success',
        followers:followers,
    });
}))

export {router as followRoute}
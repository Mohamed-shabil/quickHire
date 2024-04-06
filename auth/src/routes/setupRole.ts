import express,{Request,Response} from 'express';
import { User } from '../model/user';
import catchAsync from '../utils/catchAsync';
import { NotAutherizedError, requireAuth, validateRequest } from '@quickhire/common';
import { body,validationResult } from 'express-validator';
import {KafkaProducer} from '@quickhire/common'
import { kafkaClient } from '../events/kafkaClient';
import { createAccessToken } from '../utils/Token';
const router = express.Router();

router.patch('/api/auth/users/selectRole',[
    body('role')
        .notEmpty()
        .withMessage("Role can't be empty"),
    validateRequest
],catchAsync(async(req:Request,res:Response)=>{
    const errors = validationResult(req);
    const {role} = req.body;
    const user = await User.findOne({_id:req.currentUser?._id});
    console.log("Consoling Role from Auth-----------",role);
    if(!user){
        throw new NotAutherizedError();
    }
    user.role = role;

    await user.save();

    const payload = {
        _id:user._id.toString(),
        email:user.email,
        name:user.name,
        ...(user.phone && {phone:user.phone}),
        verified:user.verified,
        isBlocked:user.isBlocked,
        role:user.role
    };
    console.log(payload);
    new KafkaProducer(kafkaClient).produce('user-created',payload);
    
    const jwt = createAccessToken(payload);
    
    res.status(201)
        .cookie('jwt',jwt)
        .json({
            status:'success',
            user:payload
        });
    
    return res.status(200).json({
        status:'success',
        role
    });
}))

export {router as roleRouter}
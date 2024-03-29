import express,{Request,Response} from 'express';
import { Profile } from '../model/profile';
import catchAsync from '../utils/catchAsync';
import { NotAutherizedError, requireAuth, validateRequest } from '@quickhire/common';
import { body,validationResult } from 'express-validator';

const router = express.Router();

router.patch('/api/profile/selectRole',[
    body('role')
        .notEmpty()
        .withMessage("Role can't be empty"),
    validateRequest
],catchAsync(async(req:Request,res:Response)=>{
    
    const errors = validationResult(req);
    const {role} = req.body;
    const user = await Profile.findOne({_id:req.currentUser?._id});
    console.log(user);
    if(!user){
        throw new NotAutherizedError();
    }
    user.profileType = role
    await user.save();
    return res.status(200).json({
        status:'success',
        role
    });
}))

export {router as roleRouter}
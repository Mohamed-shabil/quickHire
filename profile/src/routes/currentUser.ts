import  express,{Response,Request} from 'express'
import { BadRequestError, NotAutherizedError, currentUser, requireAuth } from '@quickhire/common';
import {Profile} from '../model/profile'
import catchAsync from '../utils/catchAsync'
const router = express.Router();

router.get('/api/profile/currentUser',requireAuth,catchAsync(async(req:Request,res:Response)=>{
    console.log("CURRENT USER")
    if(!req.currentUser){
        throw new NotAutherizedError();
    }
    const user = await Profile.findOne({userId:req.currentUser._id});
    if(!user){
        throw new BadRequestError('User with this ID does not exist');
    }

    const currentUser = {
        ...req.currentUser,
        avatar:user.avatar,
        headline:user.headline
    }
    return res.status(200).json({
        status:"success",
        currentUser
    })
}))
export { router as currentUserRouter }


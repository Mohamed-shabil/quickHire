import express,{ Request, Response} from 'express';
import { NotAutherizedError, requireAuth,} from '@quickhire/common';
import catchAsync from '../utils/catchAsync';
import { User } from '../model/UserModal';

const router = express.Router();

router.delete('/api/posts/saved-post/:postId',requireAuth,catchAsync(async(req:Request,res:Response)=>{
    const { postId } = req.params;
    const currentUser = req.currentUser;

    if(!currentUser){
        throw new NotAutherizedError();
    }

    const user = await User.findOneAndUpdate(
        {_id:currentUser._id},
        { $push:{saved:postId}}
    );

    res.status(201).json({
        status:'success',
        user:user
    });
}))
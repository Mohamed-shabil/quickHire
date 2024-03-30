import express,{Request,Response} from 'express'
import { NotAutherizedError, requireAuth, validateRequest} from '@quickhire/common'
import catchAsync from '../utils/catchAsync';
import { body } from 'express-validator';
import { Posts } from '../model/postModel';
const router = express.Router();

router.patch('/api/posts/:postId/report',requireAuth,[
    body('reason')
        .notEmpty()
        .withMessage("Reasons can't be empty"),
        validateRequest
],catchAsync(async(req:Request,res:Response)=>{
    
    const { postId } = req.params;
    const { reason } = req.body;
    const currentUser = req.currentUser

    if(!currentUser){
        throw new NotAutherizedError();
    }

    const report = {
        userId : currentUser._id,
        reason : reason
    }

    const reportPost = await Posts.findOneAndUpdate(
        { _id:postId },
        { $push : { report:reason}}
    );

    res.status(200).json({
        status:'success',
        report:reportPost
    });

}));

export { router as reportRoute}
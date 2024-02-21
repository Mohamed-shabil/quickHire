import express,{Request,Response} from 'express';
import {BadRequestError,requireAuth, validateRequest} from '@quickhire/common'
import catchAsync from '../utils/catchAsync'
import { Posts } from '../model/postModel';
import { body, validationResult} from 'express-validator';

const router = express.Router();

<<<<<<< HEAD
router.patch('/api/posts/edit/:id',catchAsync(async(req:Request,res:Response)=>{
    console.log(req.body.caption)
=======
router.patch('/api/posts/edit/:id',[
    body('caption')
        .notEmpty(),
    validateRequest
],catchAsync(async(req:Request,res:Response)=>{
>>>>>>> fd6c3a30b5168342a2b5143c4b3a22665afcdd05
    const error = validationResult(req);
    const { id } = req.params;
    const post = await Posts.findById(id);
    if(!post){
        throw new BadRequestError('The post with this ID Is does not exit');
    }
<<<<<<< HEAD

    post.caption = req.body.caption;

=======
    post.caption = req.body.caption;
>>>>>>> fd6c3a30b5168342a2b5143c4b3a22665afcdd05
    await post.save();
    return res.status(200).json({
        status:'Success',
        post,
    })
}))


export {router as editPostRouter}
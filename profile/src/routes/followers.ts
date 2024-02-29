// import express,{Request,Response} from 'express';
// import { Profile } from '../model/profile';
// import catchAsync from '../utils/catchAsync';
// import { NotAutherizedError } from '@quickhire/common';

// const router = express.Router();
// router.get('/api/profile/getFollowers',catchAsync(async(req:Request,res:Response)=>{
//     const user = await Profile.findOne({userId:req.currentUser?._id});
//     if(!user){
//         throw new NotAutherizedError();
//     }
//     return res.status(200).json({
//         status:'success',
//         following:user.following,
//         followingsCount:user.following.length
//     });
// }))

// export {router as followersRoute}
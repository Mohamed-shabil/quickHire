import express,{Request, Response} from 'express';
import { catchAsync, requireAuth, isAdmin } from '@quickhire/common'
import { Follow } from '../model/follow'
const router = express.Router();

router.get('/api/profile/most-followed',requireAuth,isAdmin,catchAsync(async(req:Request,res:Response)=>{
    const users = await Follow.aggregate([
        {
            $group: {
                _id: "$follow", 
                count: { $sum: 1 }
            }
        },
        {
            $sort: {
                count: -1
            }
        }
    ]);
    res.status(200).json({
        status:'success',
        users
    })
}))
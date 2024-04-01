import { NotAutherizedError, catchAsync } from '@quickhire/common';
import express,{Request,Response} from 'express'
import jwt from 'jsonwebtoken';
import { User } from '../model/user';
import { createAccessToken, createRefreshToken } from '../utils/Token'
const router = express.Router();

router.get('/api/users/get-token',catchAsync(async(req:Request,res:Response)=>{
    const refreshToken = req.cookies._refreshtoken;
    const decode = jwt.verify(refreshToken,process.env.JWT_KEY!);
    const user = await User.findById({_id:decode});
    if(!user){
        throw new NotAutherizedError();
    }
    const payload = {
        _id:user._id.toString(),
        email:user.email,
        name:user.name,
        ...(user.phone &&{phone:user.phone}),
        verified:user.verified,
        isBlocked:user.isBlocked,
        role:user.role,
    }
    const newRefreshToken = createRefreshToken(user._id.toString());
    const accessToken = createAccessToken(payload);
    
    res.status(201)
        .cookie('_accessToken',refreshToken)
        .cookie('_refreshToken',accessToken)
        .json({
            status:'success',
            refreshToken:newRefreshToken,
            accessToken
        });
}))
import jwt from 'jsonwebtoken';
import { Response } from 'express';
export interface PayloadInterface{
    name:string;
    email:string;
    _id:string;
    phone?:string;
    verified:boolean;
    isBlocked:boolean,
    role:string
}
export const signToken = (payload:PayloadInterface)=>{
    return jwt.sign(payload,process.env.JWT_KEY!,{
        expiresIn:process.env.JWT_EXPIRESIN,
    });
} 

export const createSendToken = (payload:PayloadInterface,res:Response)=>{
    const token = signToken(payload);
    const cookieOption = {
        expires:new Date( Date.now() + 30 * 60 * 60 * 1000)
    }

    res.cookie('jwt',token,cookieOption);
    
    return res.status(200).json({
        status:'success',
        token,
        user:payload
    }) 
}
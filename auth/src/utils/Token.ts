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
    return 
} 

export const createAccessToken = (payload:PayloadInterface)=>{
    const token = jwt.sign(payload,process.env.JWT_ACCESSTOKEN_EXPIRESIN!,{
        expiresIn:process.env.JWT_EXPIRESIN,
    });
    
    return token;
}

export const createRefreshToken = (payload:string)=>{
    const token = jwt.sign(payload,process.env.JWT_REFRESHTOKEN_EXPIRESIN!,{
        expiresIn:process.env.JWT_EXPIRESIN,
    });
    
    return token;
}
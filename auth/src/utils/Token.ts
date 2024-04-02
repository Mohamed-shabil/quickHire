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

export const createAccessToken = (payload:PayloadInterface)=>{
    const token = jwt.sign(payload,process.env.JWT_KEY!,{
        expiresIn: process.env.JWT_ACCESSTOKEN_EXPIRESIN!,
    });
    return token;
}

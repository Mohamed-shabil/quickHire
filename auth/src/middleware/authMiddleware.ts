import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import AppError from "../utils/appError";


interface Payload {
    _id:string;
    name:string;
    email:string;
    phone:string;
}

declare global {
    namespace Express{
        interface Request{
            currentUser ?: Payload
        }
    }
}

exports.authChecker = async(req:Request, res:Response, next:NextFunction)=>{
    let token:string | undefined
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    if(!token){
        return next();
    }
  
    const decoded = jwt.verify(token,process.env.JWT_KEY!) as Payload;

    if(!decoded._id){
        return next();
    }

    req.currentUser = decoded;

    return next();
}


export const requireAuth = (req:Request,res:Response,next:NextFunction)=>{
    if(!req.currentUser){
        return next(new AppError('You are not authenticated',401));
    }
    next();
}
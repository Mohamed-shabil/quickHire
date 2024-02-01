import AppError from "./appError";
import { Request, Response, NextFunction } from 'express';
import {JsonWebTokenError,TokenExpiredError} from 'jsonwebtoken'

const handleJWTError = (err:JsonWebTokenError ) => new AppError('Invalid Token',401);

const handleJWTExpiredError = (err:TokenExpiredError) => new AppError('Your Token has expired ! Please Login again.',401);

const sendError = (err:AppError, req:Request, res:Response)=>{
    if(err.isOperational){
        return res.status(err.statusCode).json({
            status:'error',
            error:err,
            message:err.message
        })
    }
    return res.status(500).json({
        status: "error",
        error:err,
        message: err.message,
    });
}



const globalErrorHandler = (err: AppError, req: Request, res: Response, next : NextFunction) =>{
    
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
    err.message = err.message;
    let error = { ...err };
    error.message = err.message;

    sendError(error, req, res);

}

export default globalErrorHandler;
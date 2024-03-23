import {Request, Response, NextFunction} from 'express'
import multer from 'multer';
import ffmpeg from 'fluent-ffmpeg'
import sharp from 'sharp';
import AWS from 'aws-sdk';
import { Readable } from 'stream'



const s3 = new AWS.S3({
    credentials:{
        secretAccessKey: process.env.AWS_S3_SECRETKEY!,
        accessKeyId:process.env.AWS_S3_ACCESSKEY!,
    },
    region:process.env.AWS_BUCKET_REGION!
});


export const compressAndUploadMiddleware = (req:Request, res:Response, next:NextFunction) =>{
    if(!req.file){
        return next();
    }

    if(req.file.mimetype.startsWith('image')){
        sharp(req.file.buffer)
            .jpeg({quality:80})
            .toBuffer((err,data)=>{
                if(err){
                    console.log('Error',err);
                    return next(err)
                }

                const params:AWS.S3.PutObjectRequest = {
                    Bucket: process.env.AWS_BUCKET_NAME!,
                    Key:'chats/images/'+Date.now().toString()+'-'+req.file?.filename,
                    Body:data,
                    ContentType:'image/jpeg'
                }

                s3.upload(params,(err,data)=>{
                    if(err){
                        return next(err)
                    }
                    console.log('Image Uploaded',data.Location);
                    req.body.content = data.Location
                })

            })
    }
}
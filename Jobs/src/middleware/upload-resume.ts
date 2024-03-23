import {S3Client} from '@aws-sdk/client-s3';
import multer from 'multer';
import multerS3 from 'multer-s3';
import sharp from 'sharp';
import {BadRequestError} from '@quickhire/common'
import { Request, Response, NextFunction } from 'express';

const s3 = new S3Client({
    credentials:{
        secretAccessKey: process.env.AWS_S3_SECRETKEY!,
        accessKeyId:process.env.AWS_S3_ACCESSKEY!,
    },
    region:process.env.AWS_BUCKET_REGION!
});

const upload = multer({
    storage : multerS3({
        s3:s3,
        bucket: process.env.AWS_BUCKET_NAME!,
        metadata:function(req,file,cb){
            cb(null,{fieldName:file.fieldname})
        },
        key: function(req,file,cb){
            cb(null,'job/resumes/'+Date.now().toString()+'-'+file.originalname)
        }
    }),
    fileFilter: function (req: Request, file: Express.Multer.File, cb: Function) {
        if (file.mimetype.startsWith('application/pdf')) {
            cb(null, true);
        } else {
            cb(new BadRequestError('Only PDF files are allowed!'));
        }
    }
})
export const uploadResume = upload.single('resume');


export const setFileName = async(req:Request, res:Response, next:NextFunction)=>{
    if(req.file){
        req.body.fileName = req.file.filename
    }
    next();
}
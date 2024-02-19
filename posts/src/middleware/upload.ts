import {S3Client} from '@aws-sdk/client-s3';
import multer from 'multer';
import {multerS3} from 'multer-s3';

const s3 = new S3Client();


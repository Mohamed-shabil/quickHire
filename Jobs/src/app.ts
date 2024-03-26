import express,{urlencoded, json, NextFunction,Request,Response} from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config();
import {NotFoundError, errorHandler, currentUser} from '@quickhire/common'
import { createJobRoute } from './routes/create-job'
import { getMyAlljobs } from './routes/get-jobs'
import { searchRouter } from './routes/search-jobs'
import { getOneJob } from './routes/get-job'
import { editJobRouter } from './routes/edit-job'
import { applicantInfoRouter } from './routes/applicant-info'
import { uploadResumeRouter } from './routes/upload-resume'
import { applicantJobRouter } from './routes/apply-job'
import { appliedJobsRouter } from './routes/applied-job'
import { jobActivateRouter } from './routes/activate-job'


export const app = express();

app.use(cors({
    origin:'http://localhost:3000',
    methods:['POST','GET','DELETE','PATCH'],
    credentials: true,
}))

app.options('*', cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

app.set('trust proxy',true); 

app.use(bodyParser.urlencoded({ extended: true }))

app.use(json({
    limit:'50mb'
}));


app.use(cookieParser());

app.use(morgan('dev'));

app.use(currentUser);

app.use((req:Request,res:Response,next:NextFunction)=>{
    console.log(req.currentUser);
    next();
})

app.use(uploadResumeRouter);
app.use(appliedJobsRouter);
app.use(applicantInfoRouter);
app.use(applicantJobRouter);
app.use(createJobRoute);
app.use(getMyAlljobs)
app.use(searchRouter);
app.use(getOneJob);
app.use(editJobRouter);
app.use(jobActivateRouter);

app.all('*',() => {
    console.log('route not found 404');
    throw new NotFoundError('route not found');
})

app.use(errorHandler);




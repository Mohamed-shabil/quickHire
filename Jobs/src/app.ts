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

app.use(createJobRoute);
app.use(getMyAlljobs)

app.all('*',() => {
    console.log('route not found 404');
    throw new NotFoundError('route not found');
})

app.use(errorHandler);




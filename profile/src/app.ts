import express,{urlencoded, json} from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'

import {aboutRouter} from './routes/about';
import {profileRouter} from './routes/profile';
import {educationRouter} from './routes/education';
import {experienceRouter} from './routes/experience';
import {linksRouter} from './routes/links';

import {avatarRouter} from './routes/avatar';

dotenv.config();

import {NotFoundError, errorHandler, currentUser} from '@quickhire/common'

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

app.use(json());


app.use(urlencoded({ extended: true }))

app.use(cookieParser());

app.use(morgan('dev'));

app.use((req,res,next)=>{
    console.log("JWT TOKEN IS HERE:-",req.cookies?.jwt);
    console.log(req.currentUser);
    next();
})

app.use(currentUser);
app.use(profileRouter);
app.use(educationRouter);
app.use(experienceRouter);
app.use(aboutRouter);
app.use(avatarRouter);
app.use(linksRouter);


app.all('*',() => {
    console.log('route not found 404');
    throw new NotFoundError('route not found');
})

app.use(errorHandler);

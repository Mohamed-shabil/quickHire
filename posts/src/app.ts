import express, { json, urlencoded } from 'express';
import morgan from 'morgan';
import {currentUser } from '@quickhire/common';
import dotenv from 'dotenv';
import cors from 'cors'
import cookieParser from 'cookie-parser'
dotenv.config();

const app = express();

app.use(cors({
    origin:'http://localhost:3000',
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

app.use(currentUser);

app.use((req,res,next)=>{
    console.log(req.currentUser);
    next();
})

export {app}

import express,{urlencoded, json} from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'


import {aboutRouter} from './routes/about'


import {userCreatedConsumer} from './events/consumer/userCreatedConsumer'

dotenv.config();

import {NotFoundError, errorHandler, currentUser} from '@quickhire/common'

export const app = express();

userCreatedConsumer();
app.use(cors({
    origin:'http://localhost:3000',
    methods:['POST','GET','DELETE'],
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
app.use(aboutRouter);



app.all('*',() => {
    console.log('route not found 404');
    throw new NotFoundError('route not found');
})

app.use(errorHandler);

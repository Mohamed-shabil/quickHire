import express,{urlencoded, json} from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config();
import {NotFoundError, errorHandler, currentUser} from '@quickhire/common'

import {signupRouter} from './routes/signup'
import { loginRouter } from './routes/login';
import { logoutRouter } from './routes/logout';
import { currentUserRouter } from './routes/currentUser';
import { forgotPasswordRouter } from './routes/forgotPassword';
import { resentOtpRouter } from './routes/resendOtp';
import { verifyOtpRouter } from './routes/verifyOtp';
import { googleAuthRouter } from './routes/verifyAuth';
import { resetPasswordRouter } from './routes/resetPassword';

export const app = express();

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

app.use(signupRouter);
app.use(verifyOtpRouter);
app.use(loginRouter);
app.use(logoutRouter);
app.use(currentUserRouter)
app.use(forgotPasswordRouter)
app.use(resentOtpRouter);
app.use(resetPasswordRouter);
app.use(googleAuthRouter);

app.all('*',() => {
    console.log('route not found 404');
    throw new NotFoundError('route not found');
})

app.use(errorHandler);




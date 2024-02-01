import express from 'express'
import { json } from 'body-parser'
import cookieSession from 'cookie-session';
import {authRouter} from './routes/authRouter'
import {authChecker} from '@quickhire/common'
import globalErrorHandler from './utils/errorController';

export const app = express();

app.set('trust proxy',true); 

app.use(json());
app.use(cookieSession({
    signed:false,
    secure: process.env.NODE_ENV !== 'test',
}))

app.use(authChecker);

app.use(authRouter);

app.use(globalErrorHandler);


import express,{urlencoded, json} from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config();
import {NotFoundError, errorHandler, currentUser} from '@quickhire/common'
// import { subscriptionRoute } from './routes/subscribe'
import { createSubscriptionRoute } from './routes/create-subscription-plan'
import { subscriptionsRoute } from './routes/subscriptions'
import { editSubscriptionRoute } from './routes/edit-subscription-plan'
import { deleteSubscriptionRoute } from './routes/delete-subscription-plan'




export const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN!,
    methods:['POST','GET','DELETE','PATCH'],
    credentials: true,
}))

app.options('*', cors({
    origin: process.env.CORS_ORIGIN!,
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

app.use(createSubscriptionRoute)
app.use(subscriptionsRoute);
app.use(editSubscriptionRoute);
app.use(deleteSubscriptionRoute);

// app.use(subscriptionRoute)

app.all('*',() => {
    console.log('route not found 404');
    throw new NotFoundError('route not found');
})

app.use(errorHandler);




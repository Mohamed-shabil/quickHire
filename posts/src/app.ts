import express, { json, urlencoded } from 'express';
import morgan from 'morgan';
import {currentUser, errorHandler } from '@quickhire/common';
import dotenv from 'dotenv';
import cors from 'cors'
import cookieParser from 'cookie-parser'
import {createPostRoute} from './routes/createPost';
import { editPostRouter } from './routes/EditPost';
import { getAllPosts } from './routes/getAllposts';
import { myPostsRoute } from './routes/getAllMyPosts';
import { getOnePost } from './routes/getPost';
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

<<<<<<< HEAD
app.use(getAllPosts)
app.use(createPostRoute);
app.use(editPostRouter);
app.use(myPostsRoute);
app.use(getOnePost);
=======
app.use(createPostRoute);
app.use(editPostRouter);
>>>>>>> fd6c3a30b5168342a2b5143c4b3a22665afcdd05

app.use(errorHandler);


export {app}

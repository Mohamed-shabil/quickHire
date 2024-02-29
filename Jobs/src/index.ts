import mongoose from 'mongoose';
import {app} from './app'
import { Kafka } from 'kafkajs';

const start = async() =>{
    if(!process.env.JWT_KEY){
        throw new Error('jwt Key is not defined')
    }
    try{
        if(!process.env.MONGO_URI){
            throw new Error('Mongo Uri is not defined')
        }
        console.log(process.env.MONGO_URI)
        await mongoose.connect(process.env.MONGO_URI)
        console.log("[JOBS DB] Database Connected Successfully!")
    }catch(err){
        console.error(err);
    }
    app.listen(3005,()=>{ 
        console.log('[JOBS SERVICE] Listening on port 3005!');
    })
}

start(); 
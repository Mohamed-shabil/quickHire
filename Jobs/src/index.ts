import mongoose from 'mongoose';
import {app} from './app'
import { Kafka } from 'kafkajs';
import './config/config'


const start = async() =>{
    if(!process.env.JWT_KEY){
        throw new Error('jwt Key is not defined')
    }
    try{
        if(!process.env.MONGO_URI){
            throw new Error('Mongo Uri is not defined')
        }
    }catch(err){
        console.error(err);
    }
    app.listen(3005,()=>{ 
        console.log('[JOBS SERVICE] Listening on port 3005!');
    })
}

start(); 
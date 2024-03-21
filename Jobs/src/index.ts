import mongoose from 'mongoose';
import {app} from './app'
import { kafkaClient } from './events/kafkaClient';
import { createUser } from './events/consumer/userCreated'
import { UpdatedUser } from './events/consumer/updateUser'
import './config/config'
import {kafkaConsumer} from '@quickhire/common'

const start = async() =>{
    if(!process.env.JWT_KEY){
        throw new Error('jwt Key is not defined')
    }
    try{
        if(!process.env.MONGO_URI){
            throw new Error('Mongo Uri is not defined')
        }
        new kafkaConsumer(kafkaClient,'job-group-1').consume('user-created',createUser)
        new kafkaConsumer(kafkaClient,'job-group-2').consume('avatar-updated',UpdatedUser);
    }catch(err){
        console.error(err);
    }
    app.listen(3005,()=>{ 
        console.log('[JOBS SERVICE] Listening on port 3005!');
    })
}

start(); 
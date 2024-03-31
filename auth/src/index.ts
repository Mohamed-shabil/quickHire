import mongoose from 'mongoose';
import {app} from './app'
import { Kafka } from 'kafkajs';
import { kafkaConsumer } from '@quickhire/common';
import { kafkaClient } from './events/kafkaClient'
import { UpdatedUser } from './events/consumer/updatedUser'

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
        console.log("[AUTH DB] Database Connected Successfully!")
        new kafkaConsumer(kafkaClient,'auth-group-1').consume('avatar-updated',UpdatedUser);
        new kafkaConsumer(kafkaClient,'auth-group-2').consume('headline-updated',UpdatedUser);
    }catch(err){

        console.error(err);

    }
    app.listen(3001,()=>{ 

        console.log('[AUTH SERVICE] Listening on port 3001!');
    })
}

start(); 
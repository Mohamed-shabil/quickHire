import mongoose from 'mongoose';
import {app} from './app'
import { kafkaConsumer } from '@quickhire/common';
import { kafkaClient } from './events/kafkaClient';
import { createUser } from './events/consumer/userCreated';
import { UpdatedUser } from './events/consumer/updateUser';

const start = async() =>{
    if(!process.env.JWT_KEY){
        throw new Error('jwt Key is not defined');
    }
    try{
        if(!process.env.MONGO_URI){
            throw new Error('Mongo Uri is not defined')
        }
        console.log(process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);

        new kafkaConsumer(kafkaClient,'payment-group-1').consume('user-created',createUser)
        new kafkaConsumer(kafkaClient,'payment-group-2').consume('avatar-updated',UpdatedUser);
        
        console.log("[PAYMENT DB] Database Connected Successfully!");
    }catch(err){
        console.error(err);
    }
    app.listen(3007,()=>{
        console.log('[PAYMENT SERVICE] Listening on port 3007!');
    })
}

start(); 
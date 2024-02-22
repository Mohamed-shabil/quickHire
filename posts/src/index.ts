import mongoose from 'mongoose';
import { kafkaClient } from '../../profile/src/events/kafkaClient';
import {kafkaConsumer} from './events/KafkaBaseConsumer'
import { createUser } from './events/consumer/consumeCallback';
import {app} from './app'

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
        console.log("[POSTS DB] Database Connected Successfully!")
        
        new kafkaConsumer(kafkaClient,'post-group').consume('avatar-updated',createUser);
        
    }catch(err){

        console.error(err);

    }
    app.listen(3004,()=>{ 

        console.log('[POST SERVICE] Listening on port 3004!');
    })
}

start(); 
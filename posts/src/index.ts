import mongoose from 'mongoose';
import { kafkaClient } from '../../profile/src/events/kafkaClient';
import {kafkaConsumer} from './events/KafkaBaseConsumer'
import {UpdatedUser} from './events/consumer/updateUser';
import {createUser} from './events/consumer/userCreated';
import {app} from './app'
import { userFollow } from './events/consumer/userFollow';

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
        
        new kafkaConsumer(kafkaClient,'post-group-1').consume('user-created',createUser);
        new kafkaConsumer(kafkaClient,'post-group-2').consume('avatar-updated',UpdatedUser);
        new kafkaConsumer(kafkaClient,'post-group-3').consume('user-followed',userFollow)
        new kafkaConsumer(kafkaClient,'post-group-4').consume('user-unFollowed',userFollow)
        
    }catch(err){

        console.error(err);

    }
    app.listen(3004,()=>{ 

        console.log('[POST SERVICE] Listening on port 3004!');
    })
}

start(); 
import { kafkaConsumer } from '@quickhire/common';
import {socketService, httpServer} from './app'
import { kafkaClient } from './event/kafkaClient';
import { createUser } from './event/consumer/userCreated';
import { UpdatedUser } from './event/consumer/updateUser';

const start = async() =>{
    // if(!process.env.JWT_KEY){
    //     throw new Error('jwt Key is not defined')
    // }
    try{
        // if(!process.env.MONGO_URI){
        //     throw new Error('Mongo Uri is not defined')
        // }
        // console.log(process.env.MONGO_URI)
        // await mongoose.connect(process.env.MONGO_URI)
        // console.log("[AUTH DB] Database Connected Successfully!")
        
        new kafkaConsumer(kafkaClient,'post-group-1').consume('user-created',createUser);
        new kafkaConsumer(kafkaClient,'post-group-2').consume('avatar-updated',UpdatedUser);
        
        
    }catch(err){

        console.error(err);

    }

    httpServer.listen(3006,()=>{
        console.log('[AUTH SERVICE] Listening on port 3006!');
    })

    socketService.initListeners();
}

start(); 
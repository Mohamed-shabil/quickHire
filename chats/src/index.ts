import { server } from './app';
import http from 'http';
import socketio,{Socket} from 'socket.io';

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
        
        
    }catch(err){

        console.error(err);

    }

    server.listen(3006,()=>{
        console.log('[AUTH SERVICE] Listening on port 3006!');
    })
}

start(); 
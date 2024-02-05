import mongoose from 'mongoose';
import {app} from './app'

const start = async() =>{
    if(!process.env.JWT_KEY){
        throw new Error('jwt Key is not defined')
    }
    try{

        if(!process.env.MONGO_URI){
            throw new Error('Mongo Uri is not defined')
        }

        await mongoose.connect(process.env.MONGO_URI)

        console.log("[AUTH DB] Database Connected Successfully!")

    }catch(err){

        console.error(err);

    }
    app.listen(3000,()=>{ 

        console.log('[AUTH SERVICE] Listening on port 3000!');
    })
}

start(); 
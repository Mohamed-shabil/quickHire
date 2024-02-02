import mongoose from 'mongoose';
import {app} from './app'
import {AppError} from '@quickhire/common'

const start = async() =>{
    if(!process.env.JWT_KEY){
        throw new AppError('jwt Key is not defined',404)
    }
    try{

        if(!process.env.MONGO_URI){
            throw new AppError('Mongo Uri is not defined',404)
        }

        await mongoose.connect(process.env.MONGO_URI)

        console.log("[PROFILE DB] Database Connected Successfully!")

    }catch(err){
        console.error(err);
    }
    app.listen(3000,()=>{ 

        console.log('[PROFILE SERVICE] Listening on port 3000!');
    })
}

start(); 
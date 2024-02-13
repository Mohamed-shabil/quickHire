
import mongoose from 'mongoose';
import {kafka} from '../kafkaClient'
import { NextFunction } from 'express';

const producer = kafka.producer();
interface UserCreatedData {
    _id: mongoose.Types.ObjectId;
    name:string;
    email:string;
    phone?:string | null;
}

export const userCreatedProducer = async(data:UserCreatedData)=>{
    console.log('Im reaching')
    if(!data){
        throw new Error("data is not found in User-created Producer");
    }
    await producer.connect();
    const response = await producer.send({
        topic:'user-created',
        messages:[{value:JSON.stringify(data)}]
    });
    console.log(response)
    await producer.disconnect()
}
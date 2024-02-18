import {kafka} from '../kafkaClient';
import { EachMessagePayload, KafkaMessage } from 'kafkajs';
import {Profile} from '../../model/profile'
const consumer = kafka.consumer({groupId:'user-created-group'});

export const userCreatedConsumer = async()=>{
    await consumer.connect();
    await consumer.subscribe({topic:'user-created'});
    await consumer.run({
        eachMessage:async({ message }: EachMessagePayload)=>{
            const user = JSON.parse(message.value!.toString())
            console.log('emitted User',user)
            const newUser = await Profile.create({
                userId:user._id,
                email:user.email,
                username:user.name,
                phone:user.phone
            })
            console.log("new user :=========",newUser);
        }
    })
}
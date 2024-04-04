import { User } from "../../model/UserModel";
import { KafkaMessage } from "kafkajs";
import { BadRequestError} from '@quickhire/common';

export const createUser = async(message:KafkaMessage)=>{
    const userData = JSON.parse(message.value!.toString())
    console.log('User Creating',userData)
    
    const user = new User({
        _id:userData._id,
        name:userData.name,
        email:userData.email
    });

    await user.save()
    console.log("new user :=========",user);
}
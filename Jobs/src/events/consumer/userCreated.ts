import { User } from "../../model/UsersModel";
import { KafkaMessage } from "kafkajs";
import { BadRequestError} from '@quickhire/common';

export const createUser = async(message:KafkaMessage)=>{
    const userData = JSON.parse(message.value!.toString())
    console.log('User Creating',userData)
    
    const user = await User.create({
        _id:userData._id,
        name:userData.name,
        email:userData.email,
        phone:userData?.phone
    })

    // const user = new User({
    //     _id:userData._id,
    //     name:userData.name,
    // });

    console.log("new user :=========",user);
}
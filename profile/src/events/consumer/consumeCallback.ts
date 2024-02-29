import { Profile } from "../../model/profile";
import { KafkaMessage } from "kafkajs";

export const createProfile = async(message:KafkaMessage)=>{
    const user = JSON.parse(message.value!.toString())
    console.log('emitted User',user)
    const newUser = await Profile.create({
        userId:user._id,
        email:user.email,
        username:user.name,
        phone:user.phone,
        profileType:user.role
    })
    console.log("new user :=========",newUser);
}
import { User } from "../../model/UserModal";
import { KafkaMessage } from "kafkajs";

export const createUser = async(message:KafkaMessage)=>{
    const user = JSON.parse(message.value!.toString())
    // console.log('emitted User',user)
    const newUser = await User.create({
        userId:user._id,
        avatar:user.avatar,
    })
    console.log("new user :=========",newUser);
}
import { User } from "../../model/UserModal";
import { KafkaMessage } from "kafkajs";
import { BadRequestError} from '@quickhire/common';

export const UpdatedUser = async(message:KafkaMessage)=>{
    const userData = JSON.parse(message.value!.toString())
    console.log('emitted User',userData)
     
    const user = await User.findById({_id:userData._id});

    if(!user){
        throw new BadRequestError('User with ID does not exist');
    }
    user.avatar = userData.avatar
    user.headLine = userData.headline
    await user.save()
    console.log("new user :=========",user);
}
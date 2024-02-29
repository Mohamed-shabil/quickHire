import { Follow } from "../../model/follow";
import { User } from "../../model/UserModal";
import { KafkaMessage } from "kafkajs";


export const userFollow = async(message:KafkaMessage)=>{
    const unFollowData = JSON.parse(message.value!.toString())
    console.log('unFOllow ',unFollowData)
    
    const unFollow = await Follow.findOneAndDelete({
        follow:unFollowData.follow,
        followedBy:unFollowData.followedBy
    },
    {
        new:true
    });

    console.log("Unfollow user :=========",unFollow);
}
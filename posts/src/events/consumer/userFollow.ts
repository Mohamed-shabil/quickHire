import { Follow } from "../../model/follow";
import { User } from "../../model/UserModal";
import { KafkaMessage } from "kafkajs";


export const userFollow = async(message:KafkaMessage)=>{
    const FollowData = JSON.parse(message.value!.toString())

    console.log('User Follow',FollowData)
    
    const follow = new Follow({
        follow:FollowData.follow,
        followedBy:FollowData.followedBy
    });

    await follow.save()
    console.log("new Follower :=========",follow);
}
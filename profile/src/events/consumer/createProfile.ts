import { Profile } from "../../model/profile";
import { KafkaMessage } from "kafkajs";

export const createProfile = async (message: KafkaMessage) => {
    const userData = JSON.parse(message.value!.toString());
    console.log("emitted User", userData);
    const userExist = await Profile.findById(userData._id);

    if (userExist) {
        return console.log("User is Already Exist");
    }
    const newUser = await Profile.create({
        _id: userData._id,
        email: userData.email,
        username: userData.name,
        phone: userData.phone,
        profileType: userData.role,
    });
    console.log("new user :=========", newUser);
};

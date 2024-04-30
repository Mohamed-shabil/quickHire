import { User } from "../../model/UserModal";
import { KafkaMessage } from "kafkajs";
import { BadRequestError } from "@quickhire/common";

export const createUser = async (message: KafkaMessage) => {
    const userData = JSON.parse(message.value!.toString());
    console.log("User Creating", userData);

    const userExist = await User.findById(userData._id);

    if (userExist) {
        return console.log("User is Already Exist");
    }

    const user = new User({
        _id: userData._id,
        name: userData.name,
    });

    await user.save();
    console.log("new user from Posts :=========", user);
};

import { User } from "../../model/UsersModel";
import { KafkaMessage } from "kafkajs";
import { BadRequestError } from "@quickhire/common";

export const UpdatedUser = async (message: KafkaMessage) => {
    console.log("UPDATED USER");
    const userData = JSON.parse(message.value!.toString());
    console.log("emitted User", userData);
    const user = await User.findOne({
        where: {
            _id: userData._id,
        },
    });

    if (!user) {
        return console.log("User with ID does not exist");
    }

    user.set({
        avatar: userData.avatar,
        headLine: userData.headline,
        fullName: userData.fullname,
    });

    await user.save();
    console.log("New user:", user);
};

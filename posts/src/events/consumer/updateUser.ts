import { User } from "../../model/UserModal";
import { KafkaMessage } from "kafkajs";
import { BadRequestError } from "@quickhire/common";

export const UpdatedUser = async (message: KafkaMessage) => {
    const userData = JSON.parse(message.value!.toString());
    console.log("Updating", userData);

    const user = await User.findById({ _id: userData._id });

    if (!user) {
        throw new BadRequestError("User with ID does not exist");
    }
    user.avatar = userData.avatar;
    user.headLine = userData.headline;
    user.fullName = userData.fullname;
    await user.save();
    console.log("New User in POSTS :=========", user);
};

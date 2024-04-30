import { User } from "../../model/UserModel";
import { KafkaMessage } from "kafkajs";
import { BadRequestError } from "@quickhire/common";
import { Subscribers } from "../../model/subscribersModel";
import { Subscription } from "../../model/SubscriptionModel";

export const createUser = async (message: KafkaMessage) => {
    const userData = JSON.parse(message.value!.toString());
    console.log("User Creating", userData);

    const userExist = await User.findById(userData._id);

    if (userExist) {
        return console.log("User is Already Exist");
    }

    const startDate = new Date();
    const endDate = new Date(startDate.getFullYear() + 10);

    const freeSubscription = await Subscription.findOne({ planName: "free" });

    const subscribe = new Subscribers({
        stripeId: "00000",
        subscription: freeSubscription?._id,
        startDate: startDate,
        userId: userData._id,
        endDate: endDate,
    });

    await subscribe.save();

    const user = new User({
        _id: userData._id,
        name: userData.name,
        email: userData.email,
        role: userData.role,
        subscription: subscribe._id,
    });

    await user.save();
    console.log("new user :=========", user);
};

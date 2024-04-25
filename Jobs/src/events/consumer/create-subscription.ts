import { User } from "../../model/UsersModel";
import { KafkaMessage } from "kafkajs";
import { BadRequestError } from "@quickhire/common";
import { Subscription } from "../../model/SubscriptionModel";

export const createSubscription = async (message: KafkaMessage) => {
    const subscriptionData = JSON.parse(message.value!.toString());
    console.log("emitted subscription-Data", subscriptionData);
    const isSubscriptionExist = await Subscription.findOne({
        where: {
            _id: subscriptionData._id,
        },
    });
    if (isSubscriptionExist) {
        throw new BadRequestError("User with ID does not exist");
    }

    const subscription = await Subscription.create({
        _id: subscriptionData._id,
        planName: subscriptionData.planName,
        postLimit: subscriptionData.postLimit,
        description: subscriptionData.description,
        billingPeriod: subscriptionData.billingPeriod,
    });
    await subscription.save();
    console.log(subscription);
};

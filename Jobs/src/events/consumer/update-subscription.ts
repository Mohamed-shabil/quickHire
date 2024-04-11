import { KafkaMessage } from "kafkajs";
import { BadRequestError } from "@quickhire/common";
import { Subscription } from "../../model/SubscriptionModel";

export const updateSubscription = async (message: KafkaMessage) => {
    const subscriptionData = JSON.parse(message.value!.toString());
    console.log("emitted subscription-Data", subscriptionData);
    const isSubscriptionExist = await Subscription.findOne({
        where: {
            _id: subscriptionData._id,
        },
    });
    if (!isSubscriptionExist) {
        throw new BadRequestError("User with ID does not exist");
    }

    const subscription = await Subscription.update(
        {
            planName: subscriptionData.planName,
            postLimit: subscriptionData.postLimit,
            description: subscriptionData.description,
            startDate: subscriptionData.startDate,
            endDate: subscriptionData.endDate,
        },
        {
            where: {
                _id: subscriptionData._id,
            },
        }
    );

    if (!subscription) {
        throw new BadRequestError("No Subscription with this subscription Id");
    }

    console.log(subscription);
};

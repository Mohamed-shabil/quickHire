import { KafkaMessage } from "kafkajs";
import { BadRequestError } from "@quickhire/common";
import { Subscription } from "../../model/SubscriptionModel";

export const deleteSubscription = async (message: KafkaMessage) => {
    const subscriptionData = JSON.parse(message.value!.toString());
    console.log("emitted subscription-Data", subscriptionData);

    const subscription = await Subscription.destroy({
        where: {
            _id: subscriptionData,
        },
    });

    console.log(subscription);
};

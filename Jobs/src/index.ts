import { Topics, kafkaConsumer, TopicCallbackMap } from "@quickhire/common";
import { app } from "./app";
import { kafkaClient } from "./events/kafkaClient";
import { createUser } from "./events/consumer/userCreated";
import { UpdatedUser } from "./events/consumer/updateUser";
import { createSubscription } from "./events/consumer/create-subscription";
import { deleteSubscription } from "./events/consumer/delete-subscription";
import { updateSubscription } from "./events/consumer/update-subscription";

import "./config/config";
import "./model/Relations";

const consumer = new kafkaConsumer(kafkaClient, "jobs-group");

const start = async () => {
    try {
        if (!process.env.JWT_KEY) {
            throw new Error("jwt Key is not defined");
        }

        if (!process.env.POSTGRES_URI) {
            throw new Error("POSTGRES_URI is missing...");
        }

        if (!process.env.AWS_BUCKET_NAME) {
            throw new Error("AWS_BUCKET_NAME is missing...");
        }
        if (!process.env.AWS_BUCKET_REGION) {
            throw new Error("AWS_BUCKET_REGION is missing...");
        }
        if (!process.env.AWS_S3_ACCESSKEY) {
            throw new Error("AWS_S3_ACCESSKEY is missing...");
        }
        if (!process.env.AWS_S3_SECRETKEY) {
            throw new Error("AWS_S3_SECRETKEY is missing...");
        }
        if (!process.env.KAFKA_SERVICE) {
            throw new Error("Kafka Service is missing...");
        }

        const callbackMap: TopicCallbackMap = {
            "user-created": createUser,
            "avatar-updated": UpdatedUser,
            "headline-updated": UpdatedUser,
            "subscription-created": createSubscription,
            "subscription-updated": updateSubscription,
            "subscription-deleted": deleteSubscription,
        };
        consumer.consume(
            [
                Topics.UserCreated,
                Topics.HeadlineUpdated,
                Topics.AvatarUpdated,
                Topics.subscriptionCreated,
                Topics.subscriptionUpdated,
                Topics.subscriptionDeleted,
            ],
            callbackMap
        );
    } catch (err) {
        console.error(err);
    }
    app.listen(3005, () => {
        console.log("Updated create-job route with logger");
        console.log("[JOBS SERVICE] Listening on port 3005!");
    });
};

start();

const errorTypes = ["unhandledRejection", "uncaughtException"];
const signalTraps = ["SIGTERM", "SIGINT", "SIGUSR2"];

errorTypes.forEach((type) => {
    process.on(type, async (e) => {
        try {
            console.log(`process.on ${type}`);
            console.log(e);
            await consumer.disconnect();
            process.exit(0);
        } catch (error) {
            process.exit(1);
        }
    });
});

signalTraps.forEach((type) => {
    process.once(type, async () => {
        try {
            await consumer.disconnect();
        } catch (error) {
            process.kill(process.pid, type);
        }
    });
});

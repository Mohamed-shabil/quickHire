import mongoose from "mongoose";
// import { kafkaConsumer } from "./events/KafkaBaseConsumer";
import { UpdatedUser } from "./events/consumer/updateUser";
import { createUser } from "./events/consumer/userCreated";
import { app } from "./app";
import { kafkaClient } from "./events/kafkaClient";
import { userFollow } from "./events/consumer/userFollow";
import { userUnfollow } from "./events/consumer/userUnfollow";
import { kafkaConsumer, TopicCallbackMap, Topics } from "@quickhire/common";

const consumer = new kafkaConsumer(kafkaClient, "posts-group");
const start = async () => {
    try {
        if (!process.env.JWT_KEY) {
            throw new Error("jwt Key is not defined");
        }

        if (!process.env.MONGO_URI) {
            throw new Error("Mongo Uri is not defined");
        }
        if (!process.env.AWS_BUCKET_NAME) {
            throw new Error("AWS_BUCKET_NAME is not defined");
        }
        if (!process.env.AWS_BUCKET_REGION) {
            throw new Error("AWS_BUCKET_REGION is not defined");
        }
        if (!process.env.AWS_S3_ACCESSKEY) {
            throw new Error("AWS_S3_ACCESSKEY is not defined");
        }
        if (!process.env.AWS_S3_SECRETKEY) {
            throw new Error("AWS_S3_SECRETKEY is not defined");
        }
        if (!process.env.KAFKA_SERVICE) {
            throw new Error("kafka service is not defined");
        }
        console.log(process.env.KAFKA_SERVICE);
        await mongoose.connect(process.env.MONGO_URI);

        console.log("[POSTS DB] Database Connected Successfully!");

        const callbackMap: TopicCallbackMap = {
            "user-created": createUser,
            "avatar-updated": UpdatedUser,
            "headline-updated": UpdatedUser,
            "user-followed": userFollow,
            "user-unFollowed": userUnfollow,
        };
        consumer.consume(
            [
                Topics.UserCreated,
                Topics.AvatarUpdated,
                Topics.HeadlineUpdated,
                Topics.UserFollowed,
                Topics.UserUnfollowed,
            ],
            callbackMap
        );
    } catch (err) {
        console.error(err);
    }

    app.listen(3004, () => {
        console.log("[POST SERVICE] Listening on port 3004!");
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

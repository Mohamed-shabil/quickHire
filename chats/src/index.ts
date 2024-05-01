import { Topics, kafkaConsumer, TopicCallbackMap } from "@quickhire/common";
import mongoose from "mongoose";
import { socketService, httpServer, app } from "./app";

import { kafkaClient } from "./event/kafkaClient";
import { createUser } from "./event/consumer/userCreated";
import { UpdatedUser } from "./event/consumer/updateUser";

const consumer = new kafkaConsumer(kafkaClient, "chat-group-1");

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
        console.log(process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);
        console.log("[CHATS DB] Database Connected Successfully!");

        // new kafkaConsumer(kafkaClient, "chat-group-1").consume(
        //     "user-created",
        //     createUser
        // );
        // new kafkaConsumer(kafkaClient, "chat-group-2").consume(
        //     "avatar-updated",
        //     UpdatedUser
        // );
        // new kafkaConsumer(kafkaClient, "chat-group-3").consume(
        //     "headline-updated",
        //     UpdatedUser
        // );

        // user-created  avatar-updated  headline-updated
        const callbackMap: TopicCallbackMap = {
            "user-created": createUser,
            "avatar-updated": UpdatedUser,
            "headline-updated": UpdatedUser,
        };
        consumer.consume(
            [Topics.UserCreated, Topics.AvatarUpdated, Topics.HeadlineUpdated],
            callbackMap
        );
    } catch (err) {
        console.error(err);
    }

    app.listen(3006, () => {
        console.log("Changed Search Profile");
        console.log("[CHATS SERVICE] Listening on port 3006!");
    });

    httpServer.listen(3000, () => {
        console.log("[SOCKET SERVER] Listening on Port 3000");
    });
    socketService.initListeners();
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

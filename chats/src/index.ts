import { kafkaConsumer } from "@quickhire/common";
import mongoose from "mongoose";
import { socketService, httpServer } from "./app";
import { kafkaClient } from "./event/kafkaClient";
import { createUser } from "./event/consumer/userCreated";
import { UpdatedUser } from "./event/consumer/updateUser";

const consumer = new kafkaConsumer(kafkaClient, "chat-group");

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
        console.log(process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);
        console.log("[AUTH DB] Database Connected Successfully!");

        consumer.consume("user-created", createUser);
        consumer.consume("avatar-updated", UpdatedUser);
        consumer.consume("headline-updated", UpdatedUser);
    } catch (err) {
        console.error(err);
    }

    httpServer.listen(3006, () => {
        console.log("[CHATS SERVICE] Listening on port 3006!");
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

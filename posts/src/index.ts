import mongoose from "mongoose";
import { kafkaClient } from "./events/kafkaClient";
import { kafkaConsumer } from "./events/KafkaBaseConsumer";
import { UpdatedUser } from "./events/consumer/updateUser";
import { createUser } from "./events/consumer/userCreated";
import { app } from "./app";
import { userFollow } from "./events/consumer/userFollow";
import { userUnfollow } from "./events/consumer/userUnfollow";

const consumer = new kafkaConsumer(kafkaClient, "post-group");

const start = async () => {
    try {
        if (!process.env.JWT_KEY) {
            throw new Error("jwt Key is not defined");
        }

        if (!process.env.MONGO_URI) {
            throw new Error("Mongo Uri is not defined");
        }

        await mongoose.connect(process.env.MONGO_URI);

        console.log("[POSTS DB] Database Connected Successfully!");

        consumer.consume("user-created", createUser);
        consumer.consume("avatar-updated", UpdatedUser);
        consumer.consume("headline-updated", UpdatedUser);
        consumer.consume("user-followed", userFollow);
        consumer.consume("user-unFollowed", userUnfollow);
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

import mongoose from "mongoose";
import { app } from "./app";
import { kafkaConsumer } from "@quickhire/common";
import { kafkaClient } from "./events/kafkaClient";
import { createUser } from "./events/consumer/userCreated";
import { UpdatedUser } from "./events/consumer/updateUser";

const consumer = new kafkaConsumer(kafkaClient, "payment-group");

const start = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("Mongo Uri is not defined");
        }

        if (!process.env.JWT_KEY) {
            throw new Error("jwt Key is not defined");
        }

        console.log(process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);

        consumer.consume("user-created", createUser);
        consumer.consume("avatar-updated", UpdatedUser);

        console.log("[PAYMENT DB] Database Connected Successfully!");
    } catch (err) {
        console.error(err);
    }

    app.listen(3007, () => {
        console.log("[PAYMENT SERVICE] Listening on port 3007!");
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

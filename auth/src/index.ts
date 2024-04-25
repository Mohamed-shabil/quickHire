import mongoose from "mongoose";
import { app } from "./app";
import { Kafka } from "kafkajs";
import { kafkaConsumer } from "@quickhire/common";
import { kafkaClient } from "./events/kafkaClient";
import { UpdatedUser } from "./events/consumer/updatedUser";

const start = async () => {
    try {
        if (!process.env.JWT_KEY) {
            throw new Error("JWT_KEY is not defined");
        }
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not defined");
        }
        if (!process.env.JWT_ACCESSTOKEN_EXPIRESIN) {
            throw new Error("JWT_ACCESSTOKEN_EXPIRESIN is not defined");
        }
        if (!process.env.MAIL_PASS) {
            throw new Error("MAIL_PASS is not defined");
        }
        if (!process.env.MAIL) {
            throw new Error("MAIL is not defined");
        }
        if (!process.env.CORS_ORIGIN) {
            throw new Error("CORS ORIGIN is not defined");
        }
        if (!process.env.KAFKA_SERVICE) {
            throw new Error("Kafka service is not defined");
        }
        console.log(process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);
        console.log("[AUTH DB] Database Connected Successfully!");
        new kafkaConsumer(kafkaClient, "auth-group-1").consume(
            "avatar-updated",
            UpdatedUser
        );
        new kafkaConsumer(kafkaClient, "auth-group-2").consume(
            "headline-updated",
            UpdatedUser
        );
    } catch (err) {
        console.error(err);
    }
    app.listen(3001, () => {
        console.log("[AUTH SERVICE] Listening on port 3001!");
    });
};

start();

// const errorTypes = ["unhandledRejection", "uncaughtException"];
// const signalTraps = ["SIGTERM", "SIGINT", "SIGUSR2"];

// errorTypes.forEach((type) => {
//     process.on(type, async (e) => {
//         try {
//             console.log(`process.on ${type}`);
//             console.log(e);
//             await consumer.disconnect();
//             process.exit(0);
//         } catch (error) {
//             process.exit(1);
//         }
//     });
// });

// signalTraps.forEach((type) => {
//     process.once(type, async () => {
//         try {
//             await consumer.disconnect();
//         } catch (error) {
//             process.kill(process.pid, type);
//         }
//     });
// });

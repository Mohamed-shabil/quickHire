import { kafkaConsumer } from "@quickhire/common";
import mongoose from "mongoose";
import { socketService, httpServer, app } from "./app";
import { kafkaClient } from "./event/kafkaClient";
import { createUser } from "./event/consumer/userCreated";
import { UpdatedUser } from "./event/consumer/updateUser";

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

        new kafkaConsumer(kafkaClient, "chat-group-1").consume(
            "user-created",
            createUser
        );
        new kafkaConsumer(kafkaClient, "chat-group-2").consume(
            "avatar-updated",
            UpdatedUser
        );
        new kafkaConsumer(kafkaClient, "chat-group-3").consume(
            "headline-updated",
            UpdatedUser
        );
    } catch (err) {
        console.error(err);
    }

    httpServer.listen(3006, () => {
        console.log("[CHATS SERVICE] Listening on port 3006!");
    });

    socketService.attachToRoute(app, "/api/chats/socket");
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

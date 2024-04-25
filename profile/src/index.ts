import mongoose from "mongoose";
import { app } from "./app";
import { kafkaClient } from "./events/kafkaClient";
import { kafkaConsumer } from "@quickhire/common";
import { createProfile } from "./events/consumer/consumeCallback";

const start = async () => {
    try {
        if (!process.env.JWT_KEY) {
            throw new Error("JWT Key is not defined");
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
            throw new Error("KAFKA_SERVICE is not defined");
        }
        await mongoose.connect(process.env.MONGO_URI);

        console.log("[Profile DB] Database Connected Successfully!");

        new kafkaConsumer(kafkaClient, "profile-group").consume(
            "user-created",
            createProfile
        );
    } catch (err) {
        console.error(err);
    }
    app.listen(3003, () => {
        console.log("[PROFILE SERVICE] Listening on port 3003!");
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

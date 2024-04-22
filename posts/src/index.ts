import mongoose from "mongoose";
import { kafkaClient } from "./events/kafkaClient";
import { kafkaConsumer } from "./events/KafkaBaseConsumer";
import { UpdatedUser } from "./events/consumer/updateUser";
import { createUser } from "./events/consumer/userCreated";
import { app } from "./app";
import { userFollow } from "./events/consumer/userFollow";
import { userUnfollow } from "./events/consumer/userUnfollow";

// const consumer = new kafkaConsumer(kafkaClient, "post-group");

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
        await mongoose.connect(process.env.MONGO_URI);

        console.log("[POSTS DB] Database Connected Successfully!");
        new kafkaConsumer(kafkaClient, "post-group-1").consume(
            "user-created",
            createUser
        );
        new kafkaConsumer(kafkaClient, "post-group-2").consume(
            "avatar-updated",
            UpdatedUser
        );
        new kafkaConsumer(kafkaClient, "post-group-3").consume(
            "headline-updated",
            UpdatedUser
        );
        new kafkaConsumer(kafkaClient, "post-group-4").consume(
            "user-followed",
            userFollow
        );
        new kafkaConsumer(kafkaClient, "post-group-5").consume(
            "user-unFollowed",
            userUnfollow
        );
    } catch (err) {
        console.error(err);
    }

    app.listen(3004, () => {
        console.log("[POST SERVICE] Listening on port 3004!");
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

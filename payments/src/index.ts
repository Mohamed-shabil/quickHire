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
            throw new Error("JWT_KEY is not defined");
        }
        if (!process.env.STRIPE_PRIVATE_KEY) {
            throw new Error("STRIPE_PRIVATE_KEY is not defined");
        }
        if (!process.env.END_POINT_SECRET) {
            throw new Error("END_POINT_SECRET is not defined");
        }

        console.log(process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);

        new kafkaConsumer(kafkaClient, "payment-group-1").consume(
            "user-created",
            createUser
        );
        new kafkaConsumer(kafkaClient, "payment-group-2").consume(
            "avatar-updated",
            UpdatedUser
        );

        console.log("[PAYMENT DB] Database Connected Successfully!");
    } catch (err) {
        console.error(err);
    }

    app.listen(3007, () => {
        console.log("[PAYMENT SERVICE] Listening on port 3007!");
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

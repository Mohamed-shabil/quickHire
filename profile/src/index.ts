import mongoose from "mongoose";
import { app } from "./app";
import { kafkaClient } from "./events/kafkaClient";
import { kafkaConsumer } from "@quickhire/common";
import { createProfile } from "./events/consumer/consumeCallback";

const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error("jwt Key is not defined");
    }
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("Mongo Uri is not defined");
        }
        console.log(process.env.MONGO_URI);
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

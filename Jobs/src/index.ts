import mongoose from "mongoose";
import { app } from "./app";
import { kafkaClient } from "./events/kafkaClient";
import { createUser } from "./events/consumer/userCreated";
import { UpdatedUser } from "./events/consumer/updateUser";
import {} from "./events/consumer/delete-subscription";

import "./config/config";
import "./model/Relations";

import { kafkaConsumer } from "@quickhire/common";
import { createSubscription } from "./events/consumer/create-subscription";
import { deleteSubscription } from "./events/consumer/delete-subscription";
import { updateSubscription } from "./events/consumer/update-subscription";

const start = async () => {
    try {
        if (!process.env.JWT_KEY) {
            throw new Error("jwt Key is not defined");
        }
        if (!process.env.SEQUELISE_URL) {
            throw new Error("Sequelise Url is missing...");
        }
        new kafkaConsumer(kafkaClient, "job-group-1").consume(
            "user-created",
            createUser
        );
        new kafkaConsumer(kafkaClient, "job-group-2").consume(
            "avatar-updated",
            UpdatedUser
        );
        new kafkaConsumer(kafkaClient, "job-group-3").consume(
            "subscription-created",
            createSubscription
        );
        new kafkaConsumer(kafkaClient, "job-group-4").consume(
            "subscription-updated",
            updateSubscription
        );
        new kafkaConsumer(kafkaClient, "job-group-5").consume(
            "subscription-deleted",
            deleteSubscription
        );
    } catch (err) {
        console.error(err);
    }
    app.listen(3005, () => {
        console.log("[JOBS SERVICE] Listening on port 3005!");
    });
};

start();

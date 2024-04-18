import { Kafka } from "kafkajs";

export const kafkaClient = new Kafka({
    clientId: "profile-service",
    brokers: ["kafka-service:9092"],
});

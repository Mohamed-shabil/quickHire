import { Kafka } from "kafkajs";

export const kafkaClient = new Kafka({
    clientId: "auth-service",
    brokers: ["kafka-service:9092"],
});

import { Kafka } from "kafkajs";

export const kafkaClient = new Kafka({
    clientId: "jobs-service",
    brokers: ["kafka-srv:9092"],
    retry: {
        initialRetryTime: 100,
        retries: 8,
    },
});

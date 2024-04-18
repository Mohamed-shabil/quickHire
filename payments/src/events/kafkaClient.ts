import { Kafka } from "kafkajs";

export const kafkaClient = new Kafka({
    clientId: "payment-service",
    brokers: ["kafka-service:9092"],
    retry: {
        initialRetryTime: 100,
        retries: 8,
    },
});

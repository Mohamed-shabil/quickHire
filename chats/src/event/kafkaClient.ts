import { Kafka } from "kafkajs";

export const kafkaClient = new Kafka({
    clientId: "chats-service",
    brokers: [process.env.KAFKA_SERVICE!],
    retry: {
        initialRetryTime: 100,
        retries: 8,
    },
});

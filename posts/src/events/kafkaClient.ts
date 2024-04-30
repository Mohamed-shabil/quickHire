import { Kafka } from "kafkajs";

console.log("Kafka is here ", process.env.KAFKA_SERVICE);

export const kafkaClient = new Kafka({
    clientId: "posts-service",
    brokers: [process.env.KAFKA_SERVICE!],
    retry: {
        initialRetryTime: 100,
        retries: 8,
    },
});

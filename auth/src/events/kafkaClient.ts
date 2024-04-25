import { Kafka } from "kafkajs";

export const kafkaClient = new Kafka({
    clientId: "auth-service",
    brokers: [process.env.KAFKA_SERVICE!],
});

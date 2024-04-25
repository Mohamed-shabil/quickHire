import { Kafka } from "kafkajs";

export const kafkaClient = new Kafka({
    clientId: "profile-service",
    brokers: [process.env.KAFKA_SERVICE!],
});

import { Kafka } from "kafkajs";

export const kafkaClient = new Kafka({
    clientId: 'auth-service',
    brokers: ['localhost:9092'],
});
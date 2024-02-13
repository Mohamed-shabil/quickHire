import {Kafka} from 'kafkajs'

export const kafka = new Kafka({
    clientId: 'auth-service',
    brokers: ['localhost:9092'],
});
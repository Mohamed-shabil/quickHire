import {Kafka} from 'kafkajs'

export const kafkaClient = new Kafka({
    clientId: 'payment-service',
    brokers: ['localhost:9092'],
});
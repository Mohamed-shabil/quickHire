import { Kafka, Producer, ProducerRecord as Record,} from 'kafkajs';
import { kafkaClient } from './kafkaClient'

export class KafkaProducer {
    private producer:Producer
    constructor(kafkaClient:Kafka){
        this.producer = kafkaClient.producer();
    }

    async produce (topic:string,data:any){
        await this.producer.connect();
        const record:Record = {
            topic,
            messages:[{value:JSON.stringify(data)}]
        }
        const res = await this.producer.send(record);
        console.log(topic,res);
    }
    async disconnect (){
        await this.producer.disconnect();
    }
}
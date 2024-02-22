import { kafkaClient } from "./kafkaClient";
import { Kafka, Consumer, EachMessagePayload, KafkaMessage} from 'kafkajs';

export class kafkaConsumer{
    private consumer:Consumer;
    constructor(kafkaClient:Kafka,groupId:string){
        this.consumer = kafkaClient.consumer({groupId})
    }
    async consume(topic:string,callback:(payload: KafkaMessage)=>void){
        await this.consumer.connect();
        await this.consumer.subscribe({topic,fromBeginning:false});
        await this.consumer.run({
            eachMessage: async({message}:EachMessagePayload)=>{
                callback(message)
            }
        })
    }
    async disconnect(){
        await this.consumer.disconnect();
    }
}

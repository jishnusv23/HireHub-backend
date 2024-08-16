import {Channel} from 'amqplib'
import EventEmitter from 'events'
import {randomUUID} from 'crypto'
const eventEmitter=new EventEmitter()
export default class producer{
    constructor(
        private channel:Channel,
        private replyeQueueName:string,
        private eventEmitter:EventEmitter
    ){}

    async producerMessages(data:any,operation:string,toQueue:any){
        const uuid=randomUUID()

        this.channel.sendToQueue(
            toQueue,
            Buffer.from(JSON.stringify(data)),
            {
                replyTo:this.replyeQueueName,
                correlationId:uuid,
                expiration:10,
                headers:{
                    function:operation
                }
            }
        )

        return new Promise((resolve,reject)=>{
            this.eventEmitter.once(uuid,async(data)=>{
                const reply=JSON.parse(data)
                resolve(reply)
            })
        })
    }

}
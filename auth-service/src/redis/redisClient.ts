import {Redis} from 'ioredis'

export const Client=new Redis()

Client.on('connect',()=>{
    console.log('💡redis connected successfully.....')
})
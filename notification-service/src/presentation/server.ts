import express,{Request,Response,NextFunction, Application} from 'express'
import cookiParser from 'cookie-parser'
import morgan from 'morgan'
import RabbitMQClient from '../infrastructure/MQ/client'
import { config } from 'dotenv'
config()

const app:Application=express()
const PORT:number=Number(process.env.PORT)||5001

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookiParser())
app.use(morgan('dev'))

app.use('/test',()=>{
    console.log("notfication working")
})

const start = () => {
  app.listen(PORT, async () => {
    console.log(`The notify-service is listening on port ${PORT}`);
     const rabbitMQClient = RabbitMQClient.getInstance();
     rabbitMQClient.initialise();
  });
};
export default {start}
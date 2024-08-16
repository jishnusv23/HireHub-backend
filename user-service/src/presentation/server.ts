import express,{Request,Response,Application,NextFunction,urlencoded} from 'express'
import cookieParser from 'cookie-parser'
import RabbitMQClient from '../infrastructure/MQ/client'
const app:Application=express()

const PORTNUMBER: number = Number(process.env.PORT)||6001

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

console.log("---------------------------------")
app.get('/',()=>{
    console.log("hello")
})

const start = () => {
  app.listen(PORTNUMBER, () => {
    console.log(`The auth-service is listening on port ${PORTNUMBER}`);
    const rabbitMQClient=RabbitMQClient.getInstance()
    rabbitMQClient.initialise()
  });
};
export default { start };


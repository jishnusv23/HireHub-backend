import express,{Request,Response,Application,NextFunction,urlencoded} from 'express'
import cookieParser from 'cookie-parser'
import RabbitMQClient from '../infrastructure/MQ/client'
import { routes } from '../infrastructure/routes'
import { dependancies } from '../_boot/dependencies'
const app:Application=express()

const PORTNUMBER: number = Number(process.env.PORT)||6001

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

console.log("---------------------------------")
app.get('/',()=>{
    console.log("hello")
})
app.use('/',routes(dependancies))

const start = () => {
  app.listen(PORTNUMBER, () => {
    console.log(`The notfy-service is listening on port ${PORTNUMBER}`);
    const rabbitMQClient=RabbitMQClient.getInstance()
    rabbitMQClient.initialise()
  });
};
export default { start };


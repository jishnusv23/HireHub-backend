import express,{Request,Response,Application,NextFunction,urlencoded} from 'express'
import cookieParser from 'cookie-parser'
import RabbitMQClient from '../infrastructure/MQ/client'
import { routes } from '../infrastructure/routes'
import { dependancies } from '../_boot/dependencies'
import { HttpStatusCode } from '../_lib/http/statusCode/HttpStatusCode '
import errorHandler from '../_lib/common/error/errorhandler'
const app:Application=express()

const PORTNUMBER: number = Number(process.env.PORT)||6001

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

console.log("---------------------------------")
// app.get('/',()=>{
//     console.log("hello")
// })
// app.use("/api/user", routes(dependancies));
app.use("/", routes(dependancies));

app.use("*", (req: Request, res: Response) => {
  res.status(HttpStatusCode.NOT_FOUND).json({
    success: false,
    status: 404,
    message: "Api Not found--->userService",
  });
});

//!handle error
app.use(errorHandler)

const start = () => {
  app.listen(PORTNUMBER, () => {
    console.log(`The user-service is listening on port ${PORTNUMBER}`);
    const rabbitMQClient=RabbitMQClient.getInstance()
    rabbitMQClient.initialise()
  });
};
export default { start };


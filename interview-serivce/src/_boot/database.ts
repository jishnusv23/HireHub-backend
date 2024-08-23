// m68Zp7pahNOjLqHd
import mongoose from "mongoose";
import { config } from "dotenv";
config()
export default async()=>{
    try{
        const mongo_URI = process.env.MONGO_URI;
        if(!mongo_URI){
            throw new Error('Database url is not getting in env')
        }

        await mongoose.connect(mongo_URI.trim())
        console.log('Database connected succesfully in Interview-services---->💡')

    }catch(error:any){
        console.error('👽Something wrong in database connection');
        console.error(error.message);
        
        // throw new Error(error?.message)
        process.exit(1)
        
    }
}
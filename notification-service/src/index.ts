import server from "./presentation/server";
import database from "./_boot/database";
//*dependancies pending 

(async()=>{
    try{
        server.start()
        await Promise.all([database(),])

    }catch(error:any){
         console.error(error?.message || "An error occured");
         process.exit(1);
    }
})()
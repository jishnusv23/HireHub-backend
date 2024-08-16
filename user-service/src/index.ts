// AZtq9VPwPbjBB1ON;
import server from "./presentation/server";
import database from "./_boot/database";

(async()=>{
    try{
        server.start()
        await Promise.all([database()])

    }catch(error:any){
         console.error(error?.message || "An error occurred");
         process.exit(1);
    }
})()
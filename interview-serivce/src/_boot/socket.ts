import { Server as SocketIOServer, Socket } from "socket.io";
import { Server as HTTPServer } from "http";

let onlineUsers = new Map<string,string>();
let onlineUsersList:{userId:string,socketId:string}[]=[]

export const socket=(server:HTTPServer)=>{
    
}

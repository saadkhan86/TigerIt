import { Server,Socket } from "socket.io";
import ErrorHandler from "../ErrorHandler/ErrorHandler";
import { Server as HTTPServer } from "http";
let io:Server;
export const setupSocket=(server:HTTPServer)=>{
    io=new Server(server,{
        pingTimeout:60000,
        cors:{
            origin:"*"
        }
    })
    io.on("connection",(socket:Socket)=>{
        console.log("a user connected")
    socket.on("join_chat",(
        chatId:string
    )=>{
        socket.emit("chat_joined",chatId)
        socket.join(chatId)
    })
    socket.on("disconnect",()=>{
        console.log("A user disconnected")
        socket
    })
})
    return io
}
const getIO=()=>{
    if(!io){
        throw new ErrorHandler(500,"IO not initialized")
    }
    return io
}
export default getIO
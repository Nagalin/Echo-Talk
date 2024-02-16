import { Server } from "socket.io"
import { Server as httpServer } from "http"
import Message from "./models/Message"
import User from "./models/User"
import mongoose, { Types } from "mongoose"
import Chat from "./models/Chat"

let io: Server

const initialSocket = (httpServer: httpServer ) => {
    io = new Server(httpServer,{
        cors: {
            origin: 'http://localhost:3000',
            methods: ['GET','POST']
        }
    })

    type OnlineUsersType = {
        userId: string,
        socketId: string
    }

    let onlineUsers: OnlineUsersType[] = []

    io.on('connection', (socket) => { 
        socket.on('handshake',async(username: string) => {
            const user = await User.findOne({username})
            if(!user) throw new Error()
            onlineUsers.push({socketId: socket.id, userId: user._id.toString()})
            console.log(onlineUsers)
        })

        socket.on('chat',async (payload) => {
            console.log(payload)
            const newMessage = await Message.create({
                sender: payload.senderId,
                reciever: payload.recieverId,
                content: payload.message
            })
            await Chat.findOneAndUpdate({
                lastMessage: newMessage
            })
            const recieverSocketId = onlineUsers.find(curr => curr.userId === payload.recieverId)
            console.log(recieverSocketId)
            io.to(recieverSocketId?.socketId!).emit('chat',payload)

        })

        socket.on('disconnect',()=>{
            onlineUsers = onlineUsers.filter((user)=> user.socketId !== socket.id)
           
        })
    })

    

   
}





export default initialSocket
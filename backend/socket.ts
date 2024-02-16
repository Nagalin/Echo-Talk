import { Server } from "socket.io"
import { Server as httpServer } from "http"

let io: Server

const initialSocket = (httpServer: httpServer ) => {
    io = new Server(httpServer,{
        cors: {
            origin: 'http://localhost:3000',
            methods: ['GET','POST']
        }
    })

    type OnlineUsersType = {
        username: string,
        socketId: string
    }

    let onlineUsers: OnlineUsersType[] = []

    io.on('connection', (socket) => { 
        socket.on('handshake',(username: string) => {
            console.log('here')
            onlineUsers.push({socketId: socket.id, username: username})
            console.log(onlineUsers)
        })

        socket.on('disconnect',()=>{
            onlineUsers = onlineUsers.filter((user)=> user.socketId !== socket.id)
           
        })
    })

    

   
}





export default initialSocket
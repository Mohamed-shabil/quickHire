import express from 'express';
import http from 'http'
import socketio, { Socket } from 'socket.io';


const app = express();
export const server = http.createServer(app);
const io = new socketio.Server(server);

io.on('connection',(socket:Socket)=>{
    console.log('A User Connected');
    
    socket.on('disconnect',()=>{
        console.log('User Disconnected');
    });

    socket.on('message',(data:any)=>{
        console.log('Message Recieved',data);
    })
})




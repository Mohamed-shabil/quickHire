import { Server, Socket } from 'socket.io'
import Redis from 'ioredis';

type Chats = {
    content: string;
    reciever: string;
    sender: string;
    read: boolean;
    time: Date;
}

class SocketService {
    private _io:Server;
    private userSocketMap: Map<string, string>;
    private userIdToSocketMap: Map<string,string>;
    private socketIdToUserIdMap: Map<string,string>;
    constructor(){
        console.log('Init Socket Service ...');
        this._io = new Server({
            cors:{
                allowedHeaders:['*'],
                origin:'http://localhost:3000'
            }
        });
        this.userSocketMap = new Map();
        this.userIdToSocketMap = new Map();
        this.socketIdToUserIdMap = new Map();
    }

    public initListeners(){
        const io = this._io;
        console.log('Init Socket Listeners...');

        io.on('connect',(socket:Socket)=>{
            const socketId = socket.id;



            socket.on('event:userConnected',async({userId}:{userId:string})=>{
                console.log('user - ID from the frontend',userId);
                console.log('event:userConnected',socketId)
                this.userSocketMap.set(userId, socketId);

                this.socketIdToUserIdMap.set(socket.id,userId);
            })

            socket.on('event:message',async(message:Chats)=>{
                console.log('New Msg Rec',message);
                console.log('event:message',socketId);
                const recipientId = message.reciever
                const recipientSocketId = this.userSocketMap.get(recipientId);
                console.log('EVENT:MESSAGE',recipientSocketId,'My ID',socket.id)
                if(recipientSocketId){
                    console.log('Message:EMIT',message)
                    io.to(recipientSocketId).emit('message',message);
                }
            });



            socket.on('room:join',(data:{userId:string,room:string})=>{
                const { userId, room} = data;
                console.log(room,userId);

                this.userIdToSocketMap.set(userId,socket.id);
                this.socketIdToUserIdMap.set(socket.id,userId);


                socket.join(room);
                // to notify the user already in the Room that a new User is joined
                io.to(room).emit('user:joined',{userId,socketId:socket.id});
                
                // call initiated user is joined

        
                io.to(socket.id).emit("room:join",data);
            })

            socket.on('invite:room',({pickerId,room}:{pickerId:string,room:string})=>{
                console.log(pickerId,room);
                const pickerSocketId = this.userSocketMap.get(pickerId);
                console.log('invite:room',pickerSocketId);
                if(pickerSocketId){
                    io.to(pickerSocketId).emit("room:join",{room,pickerId})
                }
            })


            socket.on("user:call",({ to, offer})=>{
                io.to(to).emit('incoming:call',{from : socket.id, offer});
            });

            socket.on("call:accepted",({ to, ans})=>{
                io.to(to).emit("call:accepted",{ from:socket.id, ans});
            });

            socket.on("peer:nego:needed",({ to, offer})=>{
                console.log("peer:nego:needed",offer);
                io.to(to).emit("peer:nego:needed",{ from:socket.id, offer});
            });

            socket.on("peer:nego:done",({ to, ans})=>{
                console.log('peer:nego:done',ans);
                io.to(to).emit('peer:nego:final',{from : socket.id,ans});
            })

        });
    }

    get io (){
        return this._io;
    }
}

export default SocketService;
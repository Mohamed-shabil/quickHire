import { Namespace, Server, Socket } from "socket.io";
import Redis from "ioredis";
import express from "express";
import http from "http";

type Chats = {
    content: string;
    reciever: string;
    sender: string;
    read: boolean;
    time: Date;
};

class SocketService {
    private _io: Server;
    private userSocketMap: Map<string, string>;

    constructor() {
        console.log("Init Socket Service ...");
        this._io = new Server({
            cors: {
                allowedHeaders: ["*"],
                origin: [process.env.CORS_ORIGIN!, process.env.SOCKET_ORIGIN!],
            },
        });
        this.userSocketMap = new Map();
    }

    public initListeners() {
        const io = this._io;
        console.log("Init Socket Listeners...");

        io.on("connect", (socket: Socket) => {
            const socketId = socket.id;

            socket.on(
                "event:userConnected",
                async ({ userId }: { userId: string }) => {
                    console.log("user - ID from the frontend", userId);
                    console.log("event:userConnected", socketId);
                    this.userSocketMap.set(userId, socketId);
                }
            );

            socket.on("event:message", async (message: Chats) => {
                console.log("New Msg Rec", message);
                console.log("event:message", socketId);
                const recipientId = message.reciever;
                const recipientSocketId = this.userSocketMap.get(recipientId);
                console.log(
                    "EVENT:MESSAGE",
                    recipientSocketId,
                    "My ID",
                    socket.id
                );
                if (recipientSocketId) {
                    console.log("Message:EMIT", message);
                    io.to(recipientSocketId).emit("message", message);
                }
            });

            console.log("ME:JOINED");
            socket.emit("me:joined", socket.id);

            socket.on("disconnect", () => {
                socket.broadcast.emit("callEndeded");
            });

            socket.on(
                "calluser",
                ({ userToCall, signalData, from, name, avatar }) => {
                    const recipientSocketId =
                        this.userSocketMap.get(userToCall);
                    console.log("CallUser", recipientSocketId);
                    if (recipientSocketId) {
                        console.log(from);
                        io.to(recipientSocketId).emit("calluser", {
                            signal: signalData,
                            from,
                            name,
                            avatar,
                        });
                    }
                }
            );

            socket.on("answercall", (data) => {
                console.log("answerCall... callaccepted...");
                const recipientSocketId = this.userSocketMap.get(data.to);
                if (recipientSocketId) {
                    io.to(recipientSocketId).emit("callaccepted", data.signal);
                }
            });
        });
    }

    // public attachToRoute(app: express.Application, route: string) {
    //     const httpServer = http.createServer(app);
    //     const namespace = this._io.of(route);
    //     this.initListeners(namespace);
    //     httpServer.listen(process.env.PORT || 3000);
    // }

    get io() {
        return this._io;
    }
}

export default SocketService;

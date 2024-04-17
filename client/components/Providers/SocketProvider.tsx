"use client";
import { IChats } from "@/constants/constants";
import React, { RefObject, useRef } from "react";
import { useContext, useEffect, useState, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import { toast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { Stream } from "stream";
import Peer, { Instance } from "simple-peer";
import { redirect } from "next/navigation";
import { UseSelector, useSelector } from "react-redux";
import { RootState } from "@/store/reducers";
import Image from "next/image";

interface SocketProviderProps {
    children?: React.ReactNode;
}

interface Call {
    isReceivingCall: boolean;
    from: string;
    signal: any;
    avatar?: "";
    name: string;
}

interface ISocketContext {
    sendMessage: (msg: IChats) => any;
    messages: IChats | undefined;
    connectSocket: (userId: string) => any;
    socket: Socket | undefined;

    call: Call | undefined;
    callAccepted: Boolean;
    myVideo: RefObject<HTMLVideoElement>;
    userVideo: RefObject<HTMLVideoElement>;
    stream: MediaStream | undefined;
    callEnded: Boolean;
    me: string;
    callUser: (id: string) => void;
    leaveCall: () => void;
    answerCall: () => void;
    createCall: () => void;
}
const SocketContext = React.createContext<ISocketContext | null>(null);

export const useSocket = () => {
    const state = useContext(SocketContext);

    if (!state) {
        throw new Error("State is undefined");
    }
    return state;
};

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
    const [socket, setSocket] = useState<Socket>();
    const [messages, setMessages] = useState<IChats>();

    const [callAccepted, setCallAccepted] = useState(Boolean);
    const [callEnded, setCallEnded] = useState(Boolean);
    const [stream, setStream] = useState<MediaStream>();
    const [call, setCall] = useState<Call>();
    const [me, setMe] = useState("");

    const user = useSelector((state: RootState) => state.user.userData);

    const onMessageRec = useCallback((msg: IChats) => {
        console.log("On Message REc", msg);
        console.log("Recieved msg", msg.content);
        setMessages(msg);
    }, []);

    const myVideo = useRef<HTMLVideoElement>(null);
    const userVideo = useRef<HTMLVideoElement>(null);
    const connectionRef = useRef<Instance>();

    const createCall: ISocketContext["createCall"] = () => {
        navigator.mediaDevices
            .getDisplayMedia({ video: true, audio: true })
            .then((currentStream) => {
                setStream(currentStream);
                if (myVideo.current) {
                    // @ts-ignore
                    myVideo.current.srcObject = currentStream;
                }
            });

        socket?.on("me", (id) => setMe(id));
        socket?.on("callUser", ({ from, signal, name, avatar }) => {
            setCall({ isReceivingCall: true, from, signal, name, avatar });
        });
    };

    const answerCall = () => {
        setCallAccepted(true);
        const peer = new Peer({ initiator: false, trickle: false, stream });

        peer.on("signal", (data) => {
            if (call) {
                socket?.emit("answerCall", { signal: data, to: call.from });
            }
        });

        peer.on("stream", (currentStream) => {
            if (userVideo.current) {
                userVideo.current.srcObject = currentStream;
            }
        });

        if (call) {
            peer.signal(call.signal);
        }

        connectionRef.current = peer;

        redirect("/chats/videoCall");
    };

    const callUser: ISocketContext["callUser"] = (id: string) => {
        const peer = new Peer({ initiator: true, trickle: false, stream });

        peer.on("signal", (data) => {
            socket?.emit("callUser", {
                userToCall: id,
                signalData: data,
                from: me,
                name: user?.name,
                avatar: user?.avatar || "",
            });
        });

        peer.on("stream", (currentStream) => {
            if (userVideo.current) {
                userVideo.current.srcObject = currentStream;
            }
        });

        socket?.on("callAccepted", (signal) => {
            setCallAccepted(true);
            peer.signal(signal);
        });

        connectionRef.current = peer;
    };

    const leaveCall: ISocketContext["leaveCall"] = () => {
        setCallEnded(true);

        if (connectionRef.current) {
            connectionRef.current.destroy();
        }

        window.location.reload();
    };

    useEffect(() => {
        const _socket = io("http://localhost:3006");
        _socket.on("message", onMessageRec);

        setSocket(_socket);
        return () => {
            _socket.off("message", onMessageRec);

            _socket.disconnect();
            setSocket(undefined);
        };
    }, []);

    const sendMessage: ISocketContext["sendMessage"] = (msg) => {
        if (socket) {
            socket.emit("event:message", msg);
        }
    };

    const connectSocket: ISocketContext["connectSocket"] = (userId) => {
        if (socket) {
            socket.emit("event:userConnected", { userId });
        }
    };

    return (
        <SocketContext.Provider
            value={{
                sendMessage,
                messages,
                connectSocket,
                socket,
                createCall,
                call,
                callAccepted,
                myVideo,
                userVideo,
                stream,
                callEnded,
                me,
                callUser,
                leaveCall,
                answerCall,
            }}
        >
            {children}
        </SocketContext.Provider>
    );
};

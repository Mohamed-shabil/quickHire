"use client"
import { Chats } from '@/constants/constants';
import React from 'react';
import {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback,
} from 'react'
import { io , Socket} from 'socket.io-client';
import { toast } from '../ui/use-toast';
import { Check } from 'lucide-react';
import Link from 'next/link'
import { Button } from '../ui/button';
import { Stream } from 'stream';
interface SocketProviderProps{
    children?:React.ReactNode;
}


interface ISocketContext {
    sendMessage: (msg:Chats) => any;
    messages: Chats | undefined;
    connectSocket:(userId:string) => any;
    socket:Socket | undefined;
    InitCall:({userId,room}:{userId:string,room:string})=> any;
    InvitePicker:({pickerId,room}:{pickerId:string,room:string})=>void;
    remoteSocketId:string;
}
const SocketContext = React.createContext<ISocketContext | null>(null);

export const useSocket = ()=> {
    const state = useContext(SocketContext);

    if(!state){
        throw new Error('State is undefined');
    }
    return state;
}

export const SocketProvider:React.FC<SocketProviderProps> = ({children})=>{
    const [ socket, setSocket ] = useState<Socket>();
    const [ messages, setMessages ] = useState<Chats>();
    const [ remoteSocketId,setRemoteSocketId] = useState('');
    const [ myStream, setMyStream] = useState<MediaStream>()

    const onMessageRec = useCallback((msg:Chats)=>{
        console.log('On Message REc',msg)
        console.log('Recieved msg',msg.content)
        setMessages(msg);
    },[]);

    const handleUserJoined = useCallback(({userId,socketId}:{userId:string,socketId:string})=>{
        console.log('New User Joined',socketId);
        setRemoteSocketId(socketId);
    },[])

    

    useEffect(()=>{
        const _socket = io('http://localhost:3006');
        _socket.on("message",onMessageRec);
        _socket.on("room:join",handleJoinCall);
        _socket.on('user:joined',handleUserJoined);
        setSocket(_socket);
        return ()=>{
            _socket.off("room:join",handleJoinCall)
            _socket.off("message",onMessageRec);

            _socket.on('user:joined',handleUserJoined)
            
            _socket.disconnect();
            setSocket(undefined);
        }
    },[]);


    const InitCall:ISocketContext['InitCall']=({userId,room}:{userId:string,room:string}) => {
        if(socket){
            socket.emit("room:join",{userId,room});
        }
    };

    const InvitePicker:ISocketContext['InvitePicker'] = ({pickerId,room}:{pickerId:string,room:string}) =>{
        console.log('InvitePicker')
        if(socket){
            socket.emit("invite:room",{pickerId,room});
        }
    }

    const acceptInvite = useCallback((data:{userId:string,room:string})=>{
        if(socket){
            socket.emit("room:join",data);
        }
    },[socket]);


    const handleJoinCall = useCallback((data:{userId:string,room:string})=>{
        const {userId,room} = data;
        toast({
            title: "Somebody is calling ",
            action: (
                <Link href={`/chats/videoCall/${room}`}>
                    <Button>
                        <Check />
                    </Button>
                </Link>
            ),
          })
    },[])


    const sendMessage:ISocketContext['sendMessage'] =  (msg)=>{
        if(socket){
            socket.emit('event:message',msg);
        }
    }

    const connectSocket:ISocketContext['connectSocket'] = (userId)=>{
        if(socket){
            socket.emit('event:userConnected',{userId});
        }
    }
    
   
    return (
        <SocketContext.Provider value={{sendMessage,messages,connectSocket,socket,InitCall,InvitePicker,remoteSocketId}}>
            {children}
        </SocketContext.Provider>
    )
}

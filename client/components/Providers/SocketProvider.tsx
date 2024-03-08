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

interface SocketProviderProps{
    children?:React.ReactNode;
}


interface ISocketContext {
    sendMessage: (msg:Chats) => any;
    messages: Chats | undefined;
    connectSocket:(userId:string) => any;
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


    const onMessageRec = useCallback((msg:Chats)=>{
        console.log('On Message REc',msg)
        console.log('Recieved msg',msg.content)
        setMessages(msg);
    },[]);


    useEffect(()=>{
        const _socket = io('http://localhost:3006');
        _socket.on("message",onMessageRec);
        setSocket(_socket);
        
        return ()=>{
            _socket.disconnect();
            setSocket(undefined);
        }
    },[]);


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
        <SocketContext.Provider value={{sendMessage,messages,connectSocket}}>
            {children}
        </SocketContext.Provider>
    )
}

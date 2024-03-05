"use client"
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
    sendMessage: (msg: string) => any;
    messages: string[];
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
    const [ messages, setMessages ] = useState<string[]>([]);

    const sendMessage:ISocketContext['sendMessage'] = useCallback(
        (msg)=>{
            console.log('Send Message',msg);
            if(socket){
                socket.emit('')
            }
        },[socket]
    );

    const onMessageRec = useCallback((msg:string)=>{
        console.log('From Server Msg Rec',msg);
        const {message} = JSON.parse(msg) as {message:string};
        setMessages((prev)=>[...prev,message]);
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

    return (
        <SocketContext.Provider value={{sendMessage, messages}}>
            {children}
        </SocketContext.Provider>
    )
}

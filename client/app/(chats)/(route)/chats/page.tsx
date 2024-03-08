"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Clock4, Search, SendHorizontal, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSocket } from "@/components/Providers/SocketProvider";
import { useEffect, useState } from "react";
import axios from "axios";
import { User } from "@/constants/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Chats } from "@/constants/constants";
import { useSelector } from "react-redux";
import { RootState } from "@/store/reducers";
import { redirect } from "next/navigation";
import moment from 'moment';

interface IChatUser {
    _id:string
    avatar: string;
    fullName:string;
    headline:string;
    name:string
    message:Chats
}

function Chats() {
    const { sendMessage,messages } = useSocket();
    const [ content, setContent] = useState('');
    const [ chatUsers, setChatUsers] = useState<IChatUser[]>();
    const [ user, setUser] = useState<IChatUser>();
    const [ chats, setChats] = useState<Chats[]>([]);

    const currentUser = useSelector((state:RootState)=>state.user.userData); 

    useEffect(()=>{
        axios.get(`http://localhost:3006/api/chats/history/${user?._id}`)
            .then((res)=>{
                console.log(res);
                setChats(res.data.chats);
            })
            .catch((err)=>{
                console.error(err);
            })
    },[user])

    useEffect(()=>{
        axios.get('http://localhost:3006/api/chats/getAll')
            .then(res=>{
                console.log(res.data.chats)
                setChatUsers(res.data.chats);
            }).catch(err=>{
                console.log(err);
            })
    },[])
    useEffect(()=>{
        if(messages){
            setChats(prev=>[...prev,messages]);
        }
    },[messages]);

    const onSearch = async(value:string)=>{
        axios.defaults.withCredentials = true
        axios.get(`http://localhost:3003/api/profile/searchProfile?name=${value}`)
            .then((res)=>{
                console.log(res.data.chats);
                setChatUsers(res.data.chats)
            }).catch((err)=>{
                console.log(err);
            })
    }

    const handleInputChange = async(event: React.ChangeEvent<HTMLInputElement>)=>{
        console.log('Handle input Change....')
        const {value} = event.target;
        await onSearch(value)
    }
    const handleMessage = async (content:string,recipientId:string,)=>{
        if(!user?._id){
            redirect('/');
        }

        const newChat:Chats = {
            content,
            reciever:recipientId,
            sender:user._id,
            read:false,
            time:new Date(),
        }
        setChats([...chats,newChat]);
        const data = {
            recipientId,
            content
        }
        try {
            const response = await axios.post('http://localhost:3006/api/chats/saveChat',data);
            console.log('Saved Chat',response);
            sendMessage(newChat);
        } catch (err) {
            console.log(err)
        }
    } 

    return (
        <main>
            <div className="container">
                <div className="h-full grid grid-cols-3 border rounded-lg">
                    <div className="col-span-1 h-full p-3">
                        <div>
                            <div className="w-full h-14 flex items-center border-b">
                                <h2 className="font-semibold text-2xl">Chats</h2>
                            </div>
                            <div className="relative w-full h-14 flex items-center border-b">
                                <Input type="text"  placeholder="search" className="pl-7" onChange={handleInputChange}/>
                                <Search className="w-4 h-4 absolute my-auto left-2"/>
                            </div>
                            <ScrollArea className="overflow-y-auto h-[70vh]">
                                {
                                    chatUsers?.length ? 
                                    chatUsers.map((chatUser)=>(
                                        <div 
                                            className=" hover:bg-slate-50 dark:hover:bg-slate-900
                                             p-3 space-x-2 flex my-2 items-center w-full 
                                             border h-20 rounded-md"
                                             onClick={()=>{setUser(chatUser)}}
                                             >
                                            <Avatar className="h-12 w-12">
                                                <AvatarImage src={chatUser.avatar} className=" object-cover" />
                                                <AvatarFallback>CN</AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col w-full">
                                                <span className="flex justify-between w-full">
                                                    <h3 className="font-medium text-base ">{chatUser.fullName}</h3> 
                                                    <p className="text-slate-500 text-xs font-medium">{moment(chatUser.message.time).startOf('hour').fromNow()}</p>
                                                </span>
                                                <p className="line-clamp-1 font-normal text-xs">
                                                    {chatUser.message.content}
                                                </p>
                                            </div>
                                        </div>
                                    )):<></>
                                }
                                <ScrollBar orientation="horizontal"/>
                            </ScrollArea>
                        </div>
                    </div>
                    <div className="border-l box-border p-3 col-span-2 w-full h-full relative ">
                        {user ? 
                            (
                                <>
                                    <div className="border-b w-full space-x-3 h-14 flex items-center">
                                        <div className={cn("w-full flex",user ? 'justify-between' : 'justify-center')}>
                                            <span className="flex align-middle gap-1">
                                                <Avatar>
                                                    <AvatarImage src={user.avatar} className=" object-cover"/>
                                                    <AvatarFallback>CN</AvatarFallback>
                                                </Avatar>
                                                <span>
                                                    <h2 className="font-medium ">{user?.fullName}</h2>
                                                    <p className="text-slate-500 text-xs">Online</p>
                                                </span>
                                            </span>
                                            <span>
                                                <Button variant={'fade'} size={'icon'}>
                                                    <Video />
                                                </Button>
                                            </span>
                                        </div>
                                    </div>
                                    <ScrollArea className="h-full max-h-[70vh] max-w-full flex items-center">
                                        <div className="flex flex-col relative">
                                            {chats.map(chat=>(
                                                <span className={cn("flex px-2 py-1 rounded-lg w-fit mb-1 text-sm max-w-[80%] gap-2 text-wrap",
                                                    chat.sender == user?._id ? 'self-end bg-primary  text-primary-foreground':'bg-muted')}>
                                                    {chat.content}
                                                    <span className="self-end text-xs flex items-center justify-end gap-1">
                                                        {moment(chat.time).startOf('hour').fromNow()}
                                                    </span>
                                                </span>
                                            ))}

                                        </div>
                                    </ScrollArea>
                                    <div className="absolute bottom-2 left-0 p-2 w-full">
                                        <div className="flex item-center justify-between gap-2">
                                            <Input 
                                                type="text" 
                                                placeholder="Enter your message..."
                                                onChange={(e)=>{setContent(e.target.value)}}
                                            />
                                            <Button variant={'fade'} 
                                                size={'icon'} 
                                                onClick={()=>{handleMessage(content,user._id)}}>
                                                <SendHorizontal />
                                            </Button>
                                        </div>
                                    </div>
                                </>
                            ):(
                                <div className="flex flex-col items-center justify-center h-full">
                                    <Image src={'/empty.png'} alt="" width={150} height={150} className="opacity-60"/>
                                    <h1 className="text-gray-500">Select a Profile to chat</h1>
                                </div>
                            )}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Chats;
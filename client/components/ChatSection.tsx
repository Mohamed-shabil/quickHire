'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { Button } from './ui/button'
import { CheckCheck, FileVideo, Image, Paperclip, SendHorizontal, Video } from 'lucide-react'
import { Input } from './ui/input'
import { ScrollArea } from './ui/scroll-area'
import moment from 'moment'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useSocket } from './Providers/SocketProvider'
import { ChatUser, Chats, ContentType } from '@/constants/constants'
import axios from 'axios'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Label } from './ui/label'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/reducers'
import Link from 'next/link'


const ChatSection = ({user}:{user:ChatUser}) => {
    const router = useRouter();
    const {messages,sendMessage,socket,callUser} = useSocket();

    const [ chats, setChats] = useState<Chats[]>([]);
    const [ content, setContent] = useState('');
    const [ loading, setLoading ] = useState(false);
    const [ open, setOpen ] = useState(false);
    const [ image, setImage ] = useState();
    const [ video, setVideo ] = useState();
    const [ preview, setPreview ] = useState('');

    const currentUser = useSelector((state:RootState)=>state.user.userData);
    if(!currentUser?._id){
        return <h1>No Current User</h1>
    }   
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
        if(messages){
            setChats(prev=>[...prev,messages]);
        }
    },[messages]);


    const handleVideoCall = ({pickerId}:{pickerId:string})=>{
        console.log('PickerId',pickerId,)
        callUser(pickerId);
    }

    const handleMessage = async (content:string,recipientId:string,contentType:ContentType)=>{
        setLoading(true)
        const newChat = {
            content,
            reciever:recipientId,
            sender:currentUser._id,
            read:false,
            contentType,
            time:new Date(),
        }
        setChats([...chats,newChat]);
        try {
            const data = new FormData();
            data.append('recipientId',recipientId);
            data.append('content',content);
            data.append('contentType',contentType);
            
            const response = await axios.post('http://localhost:3006/api/chats/saveChat',data);
            console.log('Saved Chat',response);
            sendMessage(newChat);
        } catch (err) {
            console.log(err)
        }finally{
            setLoading(false)
        }
    }


    return (
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
                        </span>
                    </span>
                    <span>
                        <Link href={`/chats/videoCall?userId=${user._id}&initiator=true`}>
                            <Button 
                                variant={'fade'} 
                                size={'icon'}
                                >
                                <Video />
                            </Button>
                        </Link>
                    </span>
                </div>
            </div>
            <ScrollArea className="h-full max-h-[70vh] max-w-full flex items-center">
                <div className="flex flex-col relative">
                    {chats.map(chat=>(
                        <span className={cn("flex px-2 py-1 rounded-lg w-fit mb-1 text-sm max-w-[80%] gap-2 text-wrap",
                            chat.sender == currentUser._id ? 'self-end bg-primary  text-primary-foreground':'bg-muted')}>
                            {chat.content}
                            <span className="self-end text-xs flex items-center justify-end gap-1">
                                {moment(chat.time).format('LT')}
                                {chat.sender == user._id && chat.read ? <CheckCheck className="w-4" /> :""}
                            </span>
                        </span>
                    ))}
                </div>
            </ScrollArea>
            <div className="absolute bottom-2 left-0 p-2 w-full">
                <div className="flex item-center justify-between gap-2 relative">
                    <div className='absolute inset-y-2 left-2'>
                        {/* <DropdownMenu >
                            <DropdownMenuTrigger><Paperclip strokeWidth={1.5} className='w-5' /></DropdownMenuTrigger>
                            <DropdownMenuContent className='p-2'>
                                <Label htmlFor='media-image'>
                                    <DropdownMenuItem>
                                        Image
                                        <Input type='file'
                                            accept='image/*' 
                                            className='hidden' 
                                            id='media-image'
                                            onChange={()=>{handleMessage(content,user._id,'image')}}
                                        />
                                        <DropdownMenuShortcut><Image /></DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                </Label>
                                <Label htmlFor='media-video'>
                                    <DropdownMenuItem>
                                        Video
                                        <Input type='file' 
                                            accept='video/*' 
                                            className='hidden' 
                                            id='media-video'
                                            onChange={()=>{handleMessage(content,user._id,'video')}}
                                        />
                                        <DropdownMenuShortcut><FileVideo /></DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                </Label>
                            </DropdownMenuContent>
                        </DropdownMenu> */}
                    </div>
                    <Input 
                        type="text" 
                        placeholder="Enter your message..."
                        onChange={(e)=>{setContent(e.target.value)}}
                        className='pl-10'
                    />
                    <Button variant={'fade'} 
                        size={'icon'} 
                        onClick={()=>{handleMessage(content,user._id,'text')}}>
                        <SendHorizontal />
                    </Button>
                </div>
            </div>
        </>
    )
}

export default ChatSection
"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator"
import { Circle, SendHorizontal, Video } from "lucide-react";
import { Span } from "next/dist/trace";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


const users = [
    {
        name:'Mohamed Shabil',
        lastMessage:'Lorem ipsum dolor sit amet consectetur elit. Eveniet blanditiis quae autem ipsum quam consequuntur sequi perspiciatis aliquid iure nobis.',
        imageUrl:'https://github.com/shadcn.png'
    },
    {
        name:'Jhone Doe',
        lastMessage:'Lorem ipsum dolor sit amet consectetur elit. Eveniet blanditiis quae autem ipsum quam consequuntur sequi perspiciatis aliquid iure nobis.',
        imageUrl:'https://github.com/shadcn.png'
    },
    {
        name:'Abdul Jaleel',
        lastMessage:'Lorem ipsum dolor sit amet consectetur elit. Eveniet blanditiis quae autem ipsum quam consequuntur sequi perspiciatis aliquid iure nobis.',
        imageUrl:'https://github.com/shadcn.png'
    },
    {
        name:'Haneefa',
        lastMessage:'Lorem ipsum dolor sit amet consectetur elit. Eveniet blanditiis quae autem ipsum quam consequuntur sequi perspiciatis aliquid iure nobis.',
        imageUrl:'https://github.com/shadcn.png'
    },
    {
        name:'Sheheer',
        lastMessage:'Lorem ipsum dolor sit amet consectetur elit. Eveniet blanditiis quae autem ipsum quam consequuntur sequi perspiciatis aliquid iure nobis.',
        imageUrl:'https://github.com/shadcn.png'
    },
    {
        name:'Mohammed Razi',
        lastMessage:'Lorem ipsum dolor sit amet consectetur elit. Eveniet blanditiis quae autem ipsum quam consequuntur sequi perspiciatis aliquid iure nobis.',
        imageUrl:'https://github.com/shadcn.png'
    },
    {
        name:'Mubashir',
        lastMessage:'Lorem ipsum dolor sit amet consectetur elit. Eveniet blanditiis quae autem ipsum quam consequuntur sequi perspiciatis aliquid iure nobis.',
        imageUrl:'https://github.com/shadcn.png'
    },
    {
        name:'Mubashir',
        lastMessage:'Lorem ipsum dolor sit amet consectetur elit. Eveniet blanditiis quae autem ipsum quam consequuntur sequi perspiciatis aliquid iure nobis.',
        imageUrl:'https://github.com/shadcn.png'
    },
    {
        name:'Mubashir',
        lastMessage:'Lorem ipsum dolor sit amet consectetur elit. Eveniet blanditiis quae autem ipsum quam consequuntur sequi perspiciatis aliquid iure nobis.',
        imageUrl:'https://github.com/shadcn.png'
    }
]
function Chats() {
    
  return (
    <main>
        <div className="container">
            <div className="h-full grid grid-cols-3 border rounded-lg">
                <div className="col-span-1 h-full p-3">
                    <div>
                        <div className="w-full h-14 flex items-center border-b">
                            <h2 className="font-semibold text-2xl">Chats</h2>
                        </div>

                        <ScrollArea className="overflow-y-auto h-[70vh]">
                            {
                                users.map((user)=>(
                                    <div className=" hover:bg-slate-50 dark:hover:bg-slate-900 p-3 space-x-2 flex my-2 items-center w-full border h-20 rounded-md">
                                        <Avatar className="h-12 w-12">
                                            <AvatarImage src="https://github.com/shadcn.png" />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col w-full">
                                            <span className="flex justify-between w-full">
                                                <h3 className="font-medium text-base ">{user.name}</h3> 
                                                <p className="text-slate-500 text-xs font-medium">Yesterday</p>
                                            </span>
                                            <p className="line-clamp-1 font-normal text-xs">
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, iste?
                                            </p>
                                        </div>
                                    </div>
                                ))
                            }
                        </ScrollArea>
                    </div>
                </div>
                <div className="border-l box-border p-3 col-span-2 w-full relative ">
                    <div className="border-b w-full space-x-3 h-14 flex items-center">
                        <div className="w-full flex justify-between">
                            <span className="flex align-middle gap-1">
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <span>
                                    <h2 className="font-medium ">Mohamed Shabil</h2>
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
                    <div className="absolute bottom-2 left-0 p-2 w-full">
                        <div className="flex item-center justify-between gap-2">
                            <Input type="text" placeholder="Enter your message..."/>
                            <Button variant={'fade'} size={'icon'}>
                                <SendHorizontal />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
  )
}

export default Chats;
'use client'
import { Bookmark, Heart, MessageCircleMore } from "lucide-react";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { useState } from "react";
import { cn } from "@/lib/utils";
const PostCard = ({userName,avatar}:{userName:string;avatar:string;}) => {
    const [truncate, setTruncate] = useState(false);
    console.log(truncate);
    return ( 
        <a href="#" className="block rounded-lg p-3 shadow-sm shadow-indigo-100 border">
            <div className="flex gap-2 items-center">
                <Avatar className="mb-2">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <h2 className="font-medium text-sm text-slate-500"></h2>
            </div>
            <img
                alt=""
                src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                className="h-96 w-full rounded-md object-cover"
            />
            <div className="mt-2">
                <dl>
                    <div>
                        <dt className="sr-only"></dt>
                        <dd className={cn('text-sm text-gray-500', truncate? "" : "truncate")}>   
                        </dd>
                        <p className="text-sm font-medium text-blue-600" onClick={()=>setTruncate(!truncate)}>{truncate ? "Readless":'Readmore'}</p>
                    </div>
                </dl>

                <div className="mt-6 flex items-center gap-8 text-xs">
                    <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                        <Heart className="text-blue-600"/>
                        <div className="mt-1.5 sm:mt-0">
                            <p className="text-gray-500">Likes</p>
                            <p className="font-medium">256</p>
                        </div>
                    </div>

                    <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                        <MessageCircleMore className="text-blue-600"/>
                        <div className="mt-1.5 sm:mt-0">
                            <p className="text-gray-500">Comments</p>
                            <p className="font-medium">23</p>
                        </div>
                    </div>

                    <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                        <Bookmark className="text-blue-600"/>
                        <div className="mt-1.5 sm:mt-0">
                            <p className="text-gray-500">Save</p>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    );
}
 
export default PostCard;
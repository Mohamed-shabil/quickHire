'use client'
import { Bookmark, Heart, Link, MessageCircleMore, MoreVertical } from "lucide-react";
import { PostType } from "@/constants/constants";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import { UseDispatch,useDispatch,useSelector} from "react-redux";
import { RootState } from "@/store/reducers";
import { redirect } from "next/navigation";
import { setOpen } from "@/store/slices/modalSlice";
import axios from "axios";

const PostCard = ({post}:{post:PostType}) => {
    const dispatch = useDispatch();
    const [truncate, setTruncate] = useState(false);
    const [user, setUser] = useState({});

    useEffect(()=>{
        axios.get('http://localhost:3001/api/users/currentUser').then((res)=>{
            console.log(res.data);
            setUser(res.data.currentUser);
        }).catch(err=>{
            console.log(err);
        })
    },[])
    return ( 
        <div className="w-full flex items-center justify-center my-3">
            <span className="w-full max-w-lg block rounded-lg p-3 shadow-sm shadow-indigo-100 border">
                <div className="flex flex-1 gap-2 items-center">
                    <Avatar className="mb-2">
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    
                </div>
                {
                    post.media?.length ?
                    <Image
                        alt=""
                        src={post.media[0]?.url}
                        width={500}
                        height={500}
                        className="h-96 w-full rounded-md object-cover"
                    />:
                    <></>
                }
                <div className="mt-2">
                    {
                        post.caption ? 
                        (
                            <dl>
                            <div>
                                <dt className="sr-only"></dt>
                                <dd className={cn('text-sm text-gray-500', truncate? "" : "line-clamp-2")}>
                                    {post.caption}
                                </dd>
                                <p className="text-sm font-medium text-blue-600" onClick={()=>setTruncate(!truncate)}>{truncate ? "Readless":'Readmore'}</p>
                            </div>
                        </dl>
                        ): <></>
                    }

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
            </span>
        </div>
    );
}
 
export default PostCard;
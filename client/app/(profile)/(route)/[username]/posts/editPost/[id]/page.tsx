"use client"
import axios from "axios";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation"
import { PostType } from "@/constants/constants";
import { Textarea } from "@/components/ui/textarea";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";


export default function EditPost(){
    const params = useParams();
    const [post, setPost] = useState<PostType | null>(null);
    const [caption, setCaption] = useState('');
    const router = useRouter();
    const onSubmit = ()=>{
        axios.patch(`http://localhost:3004/api/posts/edit/${params.id}`,{caption:caption}).then((res)=>{
            console.log(res);
            router.push('/posts');
        })    
    }
    useEffect(()=>{
        axios.get(`http://localhost:3004/api/posts/getOne/${params.id}`).then((res)=>{
            const data:PostType = res.data.post
            setPost(data);
        })
    },[])

    console.log(post?.caption);

    return(
        <div className="flex items-center justify-center">
            <div className="w-[450px]">
                {post && post.media && post.media.length > 0 && (
                    <Image className="mb-10 rounded w-full" src={post.media[0].url} alt="" width={400} height={300} />
                )}
                <Textarea className="mb-10"
                    placeholder="Enter your caption" 
                    onChange={(e)=>{setCaption(e.target.value)}}
                    value={post?.caption}
                />
                <Button className="" onClick={onSubmit}>Update</Button>
            </div>
        </div>
    )
}


"use client";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { PostType } from "@/types/types";
import { Textarea } from "@/components/ui/textarea";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/axios/axios";
import { editPost, getOnePost } from "@/services/api/posts.service";
import { toast } from "@/components/ui/use-toast";

export default function EditPost() {
    const params = useParams();
    const [post, setPost] = useState<PostType | null>(null);
    const [caption, setCaption] = useState("");
    const router = useRouter();

    const onSubmit = async () => {
        const postId = params.id as string;
        try {
            const response = await editPost(postId, { caption });
            router.push("/");
        } catch (error: any) {
            toast({
                title: "Something Went Wrong!",
                description:
                    error.response.errors[0].message || "Please Try again",
            });
            console.log(error);
        }
    };

    useEffect(() => {
        const postId = params.id as string;
        const getPost = async () => {
            try {
                const response = await getOnePost(postId);
                const data: PostType = response.data.post;
                setPost(data);
            } catch (error) {
                console.log(error);
            }
        };
        getPost();
    }, []);

    return (
        <div className="flex items-center justify-center">
            <div className="w-[450px]">
                {post && post.media && post.media.length > 0 && (
                    <div className="w-full w-max-lg">
                        <Image
                            className="mb-10 rounded w-full h-96 object-cover"
                            src={post.media[0].url}
                            alt={`${post._id}`}
                            width={400}
                            height={300}
                        />
                    </div>
                )}
                <Textarea
                    className="mb-10"
                    placeholder="Enter your caption"
                    onChange={(e) => {
                        setCaption(e.target.value);
                    }}
                    value={post?.caption}
                />
                <Button className="w-full" onClick={onSubmit}>
                    Update
                </Button>
            </div>
        </div>
    );
}

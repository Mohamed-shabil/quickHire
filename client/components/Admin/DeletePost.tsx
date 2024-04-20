"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { axiosInstance } from "@/axios/axios";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

function DeletePost({ postId }: { postId: string }) {
    const router = useRouter();
    const DeletePost = () => {
        axiosInstance
            .delete(`/api/posts/delete/${postId}/admin`)
            .then((res) => {
                console.log(res);

                toast({
                    title: "Post deleted Successfully",
                    description: "Please try again Later",
                }),
                    router.refresh();
            })
            .catch(() => {
                toast({
                    title: "Something went wrong",
                    description: "Please try again Later",
                });
            });
    };
    return (
        <Button onClick={() => DeletePost()}>
            <Trash />
        </Button>
    );
}

export default DeletePost;

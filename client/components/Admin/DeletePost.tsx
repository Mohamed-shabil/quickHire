"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import axios from "axios";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
function DeletePost({ postId }: { postId: string }) {
    const router = useRouter();
    const DeletePost = () => {
        axios
            .delete(`http://localhost:3004/api/posts/delete/${postId}/admin`)
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

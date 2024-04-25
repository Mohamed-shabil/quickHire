"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { axiosInstance } from "@/axios/axios";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { deletePostAdmin } from "@/services/api/posts.service";

function DeletePost({ postId }: { postId: string }) {
    const router = useRouter();
    const onCick = async () => {
        try {
            const response = await deletePostAdmin(postId);
            toast({
                title: "Post deleted Successfully",
                description: "Please try again Later",
            });
            router.refresh();
        } catch (error) {
            toast({
                title: "Something went wrong",
                description: "Please try again Later",
            });
        }
    };
    return (
        <Button size={"icon"} onClick={() => onCick()}>
            <Trash />
        </Button>
    );
}

export default DeletePost;

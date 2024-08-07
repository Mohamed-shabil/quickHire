import { axiosInstance } from "@/axios/axios";
import PostCard from "@/components/PostCard";
import { getOnePost } from "@/services/api/posts.service";
import { PostType } from "@/types/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const getPost = async (token: string, postId: string): Promise<PostType> => {
    try {
        const response = await getOnePost(postId, token);
        return response.data.post;
    } catch (error: any) {
        throw new Error(error.respoanse.data.errors[0].message);
    }
};

async function Post({ params }: { params: { postId: string } }) {
    console.log(params.postId);
    const token = cookies().get("jwt")?.value;
    if (!token) {
        return redirect("/admin/login");
    }
    const post = await getPost(token, params.postId);

    return <PostCard post={post} />;
}

export default Post;

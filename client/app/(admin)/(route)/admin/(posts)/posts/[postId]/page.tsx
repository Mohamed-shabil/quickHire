import { axiosInstance } from "@/axios/axios";
import PostCard from "@/components/PostCard";
import { PostType } from "@/types/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const getPost = async (token: string, postId: string): Promise<PostType> => {
    const response = await axiosInstance.get(`/api/posts/getOne/${postId}`, {
        headers: {
            Cookie: `jwt=${token}`,
        },
    });
    return response.data.post;
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

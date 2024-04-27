import Image from "next/image";
import PostCard from "@/components/PostCard";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import CreatePostButton from "@/components/CreatePostButton";
import { PostType } from "@/types/types";
import { axiosInstance } from "@/axios/axios";
import { getAllPosts } from "@/services/api/posts.service";

const getPosts = async (token: string) => {
    try {
        const response = await getAllPosts(token);
        return response.data.post;
    } catch (error: any) {
        throw new Error(
            error.response.data.errors[0].message || "Something went wrong"
        );
    }
};

export default async function Home() {
    const token = cookies().get("jwt")?.value;
    if (!token) {
        return redirect("/signup");
    }

    const posts = await getPosts(token);
    console.log(posts);
    return (
        <section className="w-full flex flex-col justify-center">
            <CreatePostButton />
            {posts.map((post: PostType) => (
                <PostCard key={post._id} post={post} />
            ))}
        </section>
    );
}

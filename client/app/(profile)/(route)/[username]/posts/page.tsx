import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PostType } from "@/types/types";
import PostCard from "@/components/PostCard";
import { axiosInstance } from "@/axios/axios";
import { getUserPosts } from "@/services/api/posts.service";
import ErrorMessage from "@/components/ErrorMessage";
import { Button } from "@/components/ui/button";
import CreatePostButton from "@/components/CreatePostButton";

const getMyPosts = async (token: string) => {
    try {
        const repsonse = await getUserPosts(token);
        console.log(repsonse.data.posts);
        return repsonse.data.posts as PostType[];
    } catch (error: any) {
        throw Error(
            error.response.data.errors[0].message || "Something Went Wrong"
        );
    }
};

export default async function Profile() {
    const token = cookies().get("jwt")?.value;
    if (!token) {
        return redirect("/signup");
    }
    const posts = await getMyPosts(token);
    return (
        <section className="container w-full flex flex-col justify-center items-center">
            <CreatePostButton />
            {posts.length ? (
                posts.map((post: PostType, index) => {
                    return <PostCard post={post} key={index} />;
                })
            ) : (
                <div className="w-full flex justify-center flex-col">
                    <ErrorMessage
                        className="mt-11"
                        message="You don't have any posts"
                        type="info"
                    />
                </div>
            )}
        </section>
    );
}

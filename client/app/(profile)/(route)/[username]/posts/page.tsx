import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PostType } from "@/types/types";
import PostCard from "@/components/PostCard";
import { axiosInstance } from "@/axios/axios";

const getMyPosts = async (token: string) => {
    const res = await axiosInstance.get(`/api/posts/myPosts`, {
        headers: {
            Cookie: `jwt=${token}`,
        },
    });
    console.log(res.data.posts);
    return res.data.posts as PostType[];
};

export default async function Profile() {
    const token = cookies().get("jwt")?.value;
    if (!token) {
        return redirect("/signup");
    }
    const posts = await getMyPosts(token);
    return (
        <section className="container w-full flex flex-col justify-center items-center">
            {posts.length ? (
                posts.map((post: PostType, index) => {
                    return <PostCard post={post} key={index} />;
                })
            ) : (
                <h1>You dont have any posts</h1>
            )}
        </section>
    );
}

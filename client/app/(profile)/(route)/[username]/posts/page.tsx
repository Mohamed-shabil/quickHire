import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PostType } from "@/constants/constants";
import PostCard from "@/components/PostCard";

const getMyPosts = async (token:string) =>{
    axios.defaults.withCredentials = true;
    const res = await axios.get('http://localhost:3004/api/posts/myPosts',{
        headers: {
            Cookie: `jwt=${token}`
        }
    });
    console.log(res.data.posts)
    return res.data.posts as PostType[];
}

export default async function Profile() {
    const token = cookies().get('jwt')?.value;
    if(!token){
        return redirect('/signup'); 
    }
    const posts = await getMyPosts(token);
    return (
        <section  className="container w-full flex flex-col justify-center items-center">
            {
                posts.length ? 
                    posts.map((post:PostType)=>{
                        return <PostCard post={post}/>
                    }):
                <h1>You dont have any posts</h1>
            }
        </section>
    )
}
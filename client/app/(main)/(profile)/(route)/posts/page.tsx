import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PostType } from "@/constants/constants";
import MyPostCard from "@/components/MyPostCards";
const getMyPosts = async (token:string) =>{
    axios.defaults.withCredentials = true;
    const res = await axios.get('http://localhost:3004/api/posts/myPosts',{
        headers: {
            Cookie: `jwt=${token}`
        }
    });
    return res.data.post;
}

export default async function Profile() {
    const token = cookies().get('jwt')?.value;
    if(!token){
        return redirect('/signup'); 
    }
    const posts = await getMyPosts(token);
    return (
        <div className="container grid">
            {posts.map((post:PostType)=>{
                return <MyPostCard post={post}/>
            })}
        </div>
    )
}
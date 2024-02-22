import Image from "next/image";
import PostCard from "@/components/PostCard";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import CreatePostButton from "@/components/CreatePostButton";
import { PostType } from "@/constants/constants";


const getAllposts = async (token:string) =>{
  axios.defaults.withCredentials = true;
  const res = await axios.get('http://localhost:3004/api/posts/show',{
      headers: {
          Cookie: `jwt=${token}`
      }
  });
  console.log('POSTS IN SERVER FUNCTION',res.data)
  return res.data.post;
}

export default async function Home() {
  const token = cookies().get('jwt')?.value;
  if(!token){
    return redirect('/signup'); 
  }
  const posts = await getAllposts(token);
  console.log('POSTS IN SERVER',posts);
  return (
    <div className="container w-full flex flex-col justify-center">
        <CreatePostButton/>
        {posts.map((post:PostType)=>(
          <PostCard key={post._id} post={post}/>
        ))}
    </div>
  );
}

import Image from "next/image";
import PostCard from "@/components/PostCard";


export default function Home() {
  const posts = await getAllposts();
  return (
    <div className="container mx-auto">
        <PostCard/>
    </div>
  );
}

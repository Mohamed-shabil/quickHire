import Image from "next/image";
import PostCard from "@/components/PostCard";
export default function Home() {
  return (
    <div className="container grid grid-cols-10">
        <div className="col-start-3 col-span-6">
          <PostCard/>
        </div>
    </div>
  );
}

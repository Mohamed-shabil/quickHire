import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Report, Media } from "@/constants/constants";

type Post = {
    _id: string;
    creatorId: {
        _id: string;
        name: string;
        fullName?: string;
        avatar: string;
        headLine: string;
    };
    caption: string;
    media: Media[];
    report: Report[];
    createdAt: Date;
};

const getReportedPosts = async (token: string): Promise<Post[]> => {
    const response = await axios.get("http://localhost:3004/api/posts/report", {
        headers: {
            Cookie: `jwt=${token}`,
        },
    });
    return response.data.posts;
};
const PostReports = async () => {
    const token = cookies().get("jwt")?.value;
    if (!token) {
        return redirect("/admin/login");
    }

    const posts = await getReportedPosts(token);
    console.log(posts);
    return (
        <Accordion type="single" collapsible className="w-full">
            {posts.map((post) => (
                <AccordionItem value="item-1">
                    <AccordionTrigger className="flex justify-between pb-2">
                        <div className="w-full flex flex-row justify-between items-center">
                            <div className="flex items-center gap-2">
                                {post.media[0].url && (
                                    <Image
                                        src={post.media[0].url}
                                        alt="post"
                                        height={64}
                                        width={64}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                )}
                                <p className="text-secondary-foreground font-normal sm:pr-2 text-sm text-left max-w-md line-clamp-2">
                                    {post.caption}
                                </p>
                            </div>
                            <Link href={`/admin/post/${post._id}`}>
                                <Badge variant={"outline"} className="h-fit">
                                    View
                                </Badge>
                            </Link>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <h2 className="text-md font-bold">
                            Reasons for Report :
                        </h2>
                        <ul className="list-disc capitalize pl-4">
                            {post.report.map((item, index) => (
                                <li key={index}>
                                    <p className="text-xs">{item.reason}</p>
                                </li>
                            ))}
                        </ul>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
};

export default PostReports;

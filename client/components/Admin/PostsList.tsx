import Image from "next/image";
import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import moment from "moment";
import Link from "next/link";

type TrendingPost = {
    _id: string;
    likes: number;
    creator: {
        name: string;
        fullName?: string;
        avatar: string;
        headline: string;
        email: string;
    };
    caption: string;
    media: { url: string }[];
    createdAt: Date;
    report:
        | {
              userId: string;
              reason: string;
          }[]
        | [];
};

const getPosts = async (token: string): Promise<TrendingPost[]> => {
    const response = await axios.get(
        "http://localhost:3004/api/posts/trending-posts",
        {
            headers: {
                Cookie: `jwt=${token}`,
            },
        }
    );

    return response.data.posts;
};

export default async function Component() {
    const token = cookies().get("jwt")?.value;
    if (!token) {
        return redirect("/admin/login");
    }
    const posts = await getPosts(token);
    console.log(posts);
    return (
        <Card>
            <CardHeader>
                <CardTitle>Posts</CardTitle>
                <CardDescription>
                    Check the most trending Posts in quickHire
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="hidden w-[100px] sm:table-cell">
                                <span className="sr-only">Post</span>
                            </TableHead>
                            <TableHead>Caption</TableHead>
                            <TableHead>Likes</TableHead>
                            <TableHead className="hidden md:table-cell">
                                Creator
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                                Created At
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                                Reports
                            </TableHead>
                            <TableHead>
                                <span className="sr-only">Actions</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {posts.map((post) => (
                            <TableRow key={post._id}>
                                <TableCell className="hidden sm:table-cell">
                                    <Image
                                        alt="Product image"
                                        className="aspect-square rounded-md object-cover"
                                        height="64"
                                        src={post.media[0].url}
                                        width="64"
                                    />
                                </TableCell>
                                <TableCell className="font-medium">
                                    {post.caption}
                                </TableCell>
                                <TableCell className="font-medium">
                                    {post.likes || 0}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    {post.creator.name || post.creator.fullName}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    {moment(post.createdAt).format("ll")}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    {post.report.length}
                                </TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                aria-haspopup="true"
                                                size="icon"
                                                variant="ghost"
                                            >
                                                <MoreHorizontal className="h-4 w-4" />
                                                <span className="sr-only">
                                                    Toggle menu
                                                </span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>
                                                Actions
                                            </DropdownMenuLabel>
                                            <Link
                                                href={`/admin/posts/${post._id}`}
                                            >
                                                <DropdownMenuItem>
                                                    View
                                                </DropdownMenuItem>
                                            </Link>
                                            <DropdownMenuItem>
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter>
                <div className="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                    products
                </div>
            </CardFooter>
        </Card>
    );
}

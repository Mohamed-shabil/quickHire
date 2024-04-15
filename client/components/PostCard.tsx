"use client";
import {
    Bookmark,
    Flag,
    Heart,
    MessageCircleMore,
    MoreVerticalIcon,
    Option,
} from "lucide-react";
import { PostType } from "@/constants/constants";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/reducers";
import axios from "axios";
import { Separator } from "./ui/separator";
import { CommentBox } from "./commentBox";
import { useRouter } from "next/navigation";
import Link from "next/link";

import PostReportModal from "./Modals/PostReportModal";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
const PostCard = ({ post }: { post: PostType }) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const currentUser = useSelector((state: RootState) => state.user.userData);
    const [truncate, setTruncate] = useState<boolean>(false);
    const [like, setLike] = useState(post.liked);
    const [likeCount, setLikeCount] = useState(post.totalLikes);
    const [comment, setComment] = useState(false);
    const [isFollowing, setIsFollowing] = useState<boolean>(post.isFollowing);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const user = useSelector((state: RootState) => state.user.userData);

    const likePost = async (postId: string) => {
        setLike(!like);
        if (like) {
            setLikeCount(likeCount - 1);
        } else {
            setLikeCount(likeCount + 1);
        }
        axios
            .post("http://localhost:3004/api/posts/likePost", { postId })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleFollow = async () => {
        if (isFollowing) {
            setIsFollowing(!isFollowing);
            axios
                .delete(
                    `http://localhost:3003/api/profile/followers/unfollow/${post.creatorId}`
                )
                .then((res) => {
                    console.log(res);
                });
        } else {
            setIsFollowing(!isFollowing);
            axios
                .post(
                    `http://localhost:3003/api/profile/followers/follow/${post.creatorId}`
                )
                .then((res) => {
                    console.log(res);
                });
        }
        router.refresh();
    };

    const reported =
        post.report &&
        post.report.find((report) => {
            return report.userId === user?._id;
        });

    if (reported) {
        return <></>;
    }

    return (
        <div className="w-full flex flex-col items-center justify-center my-3">
            <div className="w-full max-w-lg block rounded-lg p-3 shadow-sm border">
                <div className="flex h-full itmes-center">
                    <Link
                        href={`/profile/${post.creator[0].name || ""}`}
                        className="flex flex-1 gap-2 items-center"
                    >
                        <Avatar className="mb-2">
                            <AvatarImage
                                src={post.creator[0].avatar}
                                alt="@shadcn"
                                className="object-cover"
                            />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div>
                            <h1 className="font-medium capitalize">
                                {post.creator[0].name}
                            </h1>
                            <p className="text-xs capitalize">
                                {post.creator[0].headLine}
                            </p>
                        </div>
                    </Link>
                    {post.creator[0]._id != currentUser?._id ? (
                        <div className="flex items-center justify-center">
                            <Button
                                variant={"fade"}
                                size={"mini"}
                                onClick={handleFollow}
                            >
                                {isFollowing ? "Following" : "Follow"}
                            </Button>
                            <PostReportModal postId={post._id} />
                            {/* <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <MoreVerticalIcon />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem className="flex">
                                        
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu> */}
                        </div>
                    ) : (
                        <Link href={`posts/editPost/${post._id}`}>
                            <Button variant={"ghost"}>Edit Post</Button>
                        </Link>
                    )}
                </div>
                <Separator className="my-1" />
                {post.media?.length ? (
                    <Image
                        alt=""
                        src={post.media[0]?.url}
                        width={500}
                        height={500}
                        className="h-96 w-full rounded-md object-cover"
                    />
                ) : (
                    <></>
                )}
                <div className="mt-2">
                    {post.caption ? (
                        <dl>
                            <div>
                                <dt className="sr-only"></dt>
                                <dd
                                    className={cn(
                                        "text-sm text-gray-500",
                                        truncate ? "" : "line-clamp-3"
                                    )}
                                >
                                    {post.caption}
                                </dd>
                                <p
                                    className="text-sm font-medium text-blue-600"
                                    onClick={() => setTruncate(!truncate)}
                                >
                                    {truncate ? "Readless" : "Readmore"}
                                </p>
                            </div>
                        </dl>
                    ) : (
                        <></>
                    )}

                    <div className="mt-6 flex items-center gap-8 text-xs">
                        <Button
                            variant={"ghost"}
                            onClick={() => {
                                likePost(post._id);
                            }}
                            className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2"
                        >
                            <Heart
                                className={cn(
                                    "text-blue-600 cursor-pointer",
                                    like ? "fill-blue-600" : ""
                                )}
                            />
                            <div className="mt-1.5 sm:mt-0">
                                <p className="text-gray-500 font-normal text-xs">
                                    Likes
                                </p>
                                <p className="font-medium text-xs">
                                    {likeCount}
                                </p>
                            </div>
                        </Button>
                        <Button
                            variant={"ghost"}
                            onClick={() => setComment(!comment)}
                            type="button"
                            className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2"
                        >
                            <MessageCircleMore className="text-blue-600 cursor-pointer" />
                            <div className="mt-1.5 sm:mt-0">
                                <p className="text-gray-500 font-normal text-xs">
                                    Comments
                                </p>
                                <p className="font-medium text-xs">
                                    {post.comments?.length}
                                </p>
                            </div>
                        </Button>

                        {/* <Button variant={'ghost'} className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                            <Bookmark className="text-blue-600 cursor-pointer"/>
                            <div className="mt-1.5 sm:mt-0">
                                <p className="text-gray-500 font-normal text-xs">Save</p>
                                <p className="font-medium"></p>

                            </div>
                        </Button> */}
                    </div>
                    {comment ? <CommentBox postId={post._id} /> : ""}
                </div>
            </div>
        </div>
    );
};

export default PostCard;

import { axiosInstance } from "@/axios/axios";
import { Comment } from "./Comment";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { number, z } from "zod";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { Loader2, SendHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";
import { RootState } from "@/store/reducers";
import { getComments } from "@/services/api/posts.service";
import { toast } from "./ui/use-toast";

type comment = {
    comment: string;
    createdAt: Date;
    post: string;
    user: {
        _id: string;
        name: string;
        avatar: string;
        headLine: string;
    };
};

type commentData = {
    comment: comment[];
    commentCount: number;
    page: number;
};
export function CommentBox({ postId }: { postId: string }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const user = useSelector((state: RootState) => state.user.userData);
    const [comments, setComments] = useState<comment[] | undefined>();
    const [commentsData, setCommentsData] = useState<commentData>();

    const refetch = async () => {
        try {
            const response = await getComments(postId);
            setComments(response.data.comment);
            setCommentsData(response.data);
        } catch (error: any) {
            toast({
                title: "Something went wrong!",
                description:
                    error.response.errors[0].message || "Please try again",
                action: (
                    <div className="h-8 w-8 bg-rose-500 text-white grid place-items-center rounded">
                        <X />
                    </div>
                ),
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refetch();
    }, []);

    const formSchema = z.object({
        comment: z.string(),
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            comment: "",
        },
        mode: "onTouched",
    });

    console.log({ comments });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        axiosInstance
            .patch("/api/posts/comments", {
                comment: values.comment,
                postId,
            })
            .then((res) => {
                console.log("comment is reaching ...", res);
                form.reset();
                refetch();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className={cn("mt-4")}>
            <div className="flex flex-row gap-2">
                <Avatar className="mb-2">
                    <AvatarImage
                        src={user?.avatar}
                        alt="@shadcn"
                        className="object-cover"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="w-full mb-5">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="flex flex-1 gap-2 items-center justify-center w-full"
                        >
                            <FormField
                                name="comment"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormControl>
                                            <Input
                                                type="text"
                                                {...field}
                                                placeholder="Add a comment ..."
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            ></FormField>
                            <Button
                                variant={"fade"}
                                size={"mini"}
                                className="h-9 rounded-sm"
                                type="submit"
                            >
                                <SendHorizontal />
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
            <div>
                {loading ? (
                    <span className="flex justify-center">
                        <Loader2 className="animate-spin text-blue-500" />
                    </span>
                ) : comments?.length ? (
                    comments.map((comment, index) => (
                        <Comment comment={comment} key={index} />
                    ))
                ) : (
                    <></>
                )}
                {/* <Button className="mx-auto" variant={"link"} >
                    LoadMore
                </Button> */}
            </div>
        </div>
    );
}

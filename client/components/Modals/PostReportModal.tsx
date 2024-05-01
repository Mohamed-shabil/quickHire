import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Ban, Check, Flag, Loader2, MessageCircleMore, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { axiosInstance } from "@/axios/axios";
import { useState } from "react";
import { reportPost } from "@/services/api/posts.service";
import { useRouter } from "next/navigation";

function PostReportModal({ postId }: { postId: string }) {
    const [open, setOpen] = useState<boolean>(false);
    const router = useRouter();
    const FormSchema = z.object({
        reason: z.enum(
            [
                "spam or misleading content",
                "hate speech or harassment",
                "violence or graphic content",
                "nudity or adult content",
                "intellectual property infringement",
                "impersonation or fake accounts",
                "privacy violation",
                "false information",
                "inappropriate language or behavior",
            ],
            {
                required_error: "You need to select one option from above.",
            }
        ),
    });
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    const isLoading = form.formState.isLoading;
    const onSubmit = async (value: z.infer<typeof FormSchema>) => {
        console.log(value);
        try {
            const response = await reportPost(postId, value);
            console.log(response);
            toast({
                title: "Report has been submitted",
                action: (
                    <div className="h-8 w-8 bg-emerald-500 text-white grid place-items-center rounded">
                        <Check />
                    </div>
                ),
            });
            onClose();
            router.refresh();
        } catch (error: any) {
            console.log(error);
            toast({
                title: "Something went wrong",
                description:
                    error.response.errors[0].message ||
                    "Please Try again later !",
                action: (
                    <div className="h-8 w-8 bg-rose-500 text-white grid place-items-center rounded">
                        <X />
                    </div>
                ),
            });
        }
    };

    const onClose = () => {
        form.reset();
        setOpen(false);
    };

    return (
        <Dialog
            open={open}
            onOpenChange={(e) => {
                setOpen(e);
            }}
        >
            <DialogTrigger
                className="flex items-center"
                onClick={() => setOpen(true)}
            >
                {/* <Button variant={"ghost"}>
                    <Flag className="text-blue-600 cursor-pointer" />
                    Report
                </Button> */}
                <Button
                    variant={"ghost"}
                    type="button"
                    className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2"
                >
                    <Ban className="text-blue-600 cursor-pointer" />
                    <div className="mt-1.5 sm:mt-0">
                        <p className="text-gray-500 font-normal text-xs">
                            Report
                        </p>
                    </div>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-2/3 space-y-6"
                    >
                        <FormField
                            control={form.control}
                            name="reason"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex flex-col space-y-1"
                                        >
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="spam or misleading content" />
                                                </FormControl>
                                                <FormLabel className="font-normal capitalize">
                                                    spam or misleading content
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="hate speech or harassment" />
                                                </FormControl>
                                                <FormLabel className="font-normal capitalize">
                                                    hate speech or harassment
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="violence or graphic content" />
                                                </FormControl>
                                                <FormLabel className="font-normal capitalize">
                                                    violence or graphic content
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="nudity or adult content" />
                                                </FormControl>
                                                <FormLabel className="font-normal capitalize">
                                                    nudity or adult content
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="intellectual property infringement" />
                                                </FormControl>
                                                <FormLabel className="font-normal capitalize">
                                                    intellectual property
                                                    infringement
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="impersonation or fake accounts" />
                                                </FormControl>
                                                <FormLabel className="font-normal capitalize">
                                                    impersonation or Fake
                                                    Accounts
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="privacy violation" />
                                                </FormControl>
                                                <FormLabel className="font-normal capitalize">
                                                    privacy violation
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="False Information" />
                                                </FormControl>
                                                <FormLabel className="font-normal capitalize">
                                                    false information
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="inappropriate language or behavior" />
                                                </FormControl>
                                                <FormLabel className="font-normal capitalize">
                                                    inappropriate language or
                                                    behavior
                                                </FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className="" type="submit" disabled={isLoading}>
                            {isLoading ? (
                                <Loader2 className="animate-spin" />
                            ) : (
                                "Submit"
                            )}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default PostReportModal;

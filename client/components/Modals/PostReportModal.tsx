import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Check, Flag } from "lucide-react";
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
import axios from "axios";

function PostReportModal({ postId }: { postId: string }) {
    const FormSchema = z.object({
        report: z.enum(
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

    const onSubmit = (value: z.infer<typeof FormSchema>) => {
        console.log(value);
        axios
            .patch(
                `http://localhost:3004/api/posts/${postId}/report`,
                {
                    reason: value.report,
                },
                {
                    withCredentials: true,
                }
            )
            .then((res) => {
                console.log(res);
                toast({
                    title: "Report has been submitted",
                    action: (
                        <div className="h-8 w-8 bg-emerald-500 text-white grid place-items-center rounded">
                            <Check />
                        </div>
                    ),
                });
            });
    };

    return (
        <Dialog>
            <DialogTrigger className="flex items-center">
                <Flag className="mr-2 h-4 w-4" />
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
                            name="report"
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
                        <Button className="" type="submit">
                            Submit
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default PostReportModal;

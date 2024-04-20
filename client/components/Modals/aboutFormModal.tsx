import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { axiosInstance } from "@/axios/axios";
import { toast } from "../ui/use-toast";
import { Check, Router } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/reducers";
import { setClose } from "@/store/slices/modalSlice";
import { useRouter } from "next/navigation";

export function AboutFormModal() {
    const dispatch = useDispatch();
    const router = useRouter();
    const formSchema = z.object({
        fullName: z.string().min(4, {
            message: "Full name must be more than 4 characters long",
        }),
        headline: z.string().min(4, {
            message: "Headline must be 4 characters long",
        }),
        bio: z.string().min(20, {
            message: "Bio must be atleast 20 characters long",
        }),
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            headline: "",
            bio: "",
        },
        mode: "onTouched",
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        axiosInstance
            .post("/api/profile/about", values)
            .then((res) => {
                toast({
                    title: "Profile About Updated Successfully",
                    action: (
                        <div className="h-8 w-8 bg-emerald-500 text-white grid place-items-center rounded">
                            <Check />
                        </div>
                    ),
                });
                onClose();
                router.refresh();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const onClose = () => {
        dispatch(setClose());
    };
    const isLoading = form.formState.isSubmitting;
    const user = useSelector((state: RootState) => state.user.userData);
    const open = useSelector((state: RootState) => state.modal.open);
    const type = useSelector((state: RootState) => state.modal.type);
    const isModalOpen = open && type === "AboutFormModal";

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>About Section</DialogTitle>
                    <DialogDescription>
                        {
                            "Make changes to your profile here. Click save when you're done."
                        }
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="mt-8 grid grid-cols-6 gap-6"
                    >
                        <div className="col-span-6">
                            <FormField
                                name="fullName"
                                disabled={isLoading}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="block text-sm font-medium">
                                            Full Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                {...field}
                                                className="mt-1 w-full rounded-md"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="col-span-6">
                            <FormField
                                name="headline"
                                disabled={isLoading}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Headline</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                className="mt-1 w-full rounded-md"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="col-span-6">
                            <FormField
                                name="bio"
                                disabled={isLoading}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel> Bio </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                className="mt-1 w-full rounded-md"
                                                {...field}
                                                placeholder="Type your message here."
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter>
                            <Button disabled={isLoading} type="submit">
                                Submit
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

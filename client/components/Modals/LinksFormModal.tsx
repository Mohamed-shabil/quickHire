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
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { axiosInstance } from "@/axios/axios";
import { toast } from "../ui/use-toast";
import { Check, Loader2, Router, X } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/reducers";
import { setClose } from "@/store/slices/modalSlice";
import { useRouter } from "next/navigation";

export function LinkFormModal() {
    const dispatch = useDispatch();
    const router = useRouter();

    const formSchema = z
        .object({
            location: z.string().min(4, {
                message: "Location must be more than 4 characters long",
            }),
            portfolio: z
                .string()
                .url({
                    message: "Invalid URL Format",
                })
                .optional(),
            customUrl: z
                .string()
                .url({
                    message: "Invalid URL Format",
                })
                .optional(),
            urlName: z.string().optional(),
        })
        .refine(
            (data) => {
                return (
                    (data.customUrl && data.urlName) ||
                    (!data.customUrl && !data.urlName)
                );
            },
            {
                message: "Provide both Custom Url and Url Name",
            }
        );

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            location: "",
            portfolio: "",
            customUrl: "",
            urlName: "",
        },
        mode: "onTouched",
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        axiosInstance
            .patch("/api/profile/links", values)
            .then((res) => {
                toast({
                    title: "Profile Section Updated Successfully",
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
                toast({
                    title: "Something Went Wrong",
                    description: "Please try again!",
                    action: (
                        <div className="h-8 w-8 bg-rose-500 text-white grid place-items-center rounded">
                            <X />
                        </div>
                    ),
                });
            });
    };

    const onClose = () => {
        dispatch(setClose());
    };
    const isLoading = form.formState.isSubmitting;
    const user = useSelector((state: RootState) => state.user.userData);
    const open = useSelector((state: RootState) => state.modal.open);
    const type = useSelector((state: RootState) => state.modal.type);
    const isModalOpen = open && type === "LinkFormModal";

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>More Details</DialogTitle>
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
                                name="location"
                                disabled={isLoading}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="block text-sm font-medium">
                                            Location
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
                                name="portfolio"
                                disabled={isLoading}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Portfolio Url (Optional)
                                        </FormLabel>
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
                                name="urlName"
                                disabled={isLoading}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Custom url Name (Optional)
                                        </FormLabel>
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
                                name="customUrl"
                                disabled={isLoading}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Custom url</FormLabel>
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
                        <DialogFooter>
                            <Button disabled={isLoading} type="submit">
                                {isLoading ? (
                                    <Loader2 className="animate-spin" />
                                ) : (
                                    "Submit"
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

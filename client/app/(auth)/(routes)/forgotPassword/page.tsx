"use client";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { axiosInstance } from "@/axios/axios";
import { useForm } from "react-hook-form";
import * as z from "zod";
import AlertModal from "@/components/AlertModal";
import { useState } from "react";
import { Loader2, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { setClose, setOpen } from "@/store/slices/modalSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/store/reducers";
import { forgotPassword } from "@/services/api/auth.service";

const Forgotpassword = () => {
    const [disable, setDisable] = useState(false);
    const dispatch = useDispatch();
    const formSchema = z.object({
        email: z.string().email({
            message: "Invalid email format",
        }),
    });
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
        mode: "onTouched",
    });

    const open = useSelector((state: RootState) => state.modal.open);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
        try {
            const res = await forgotPassword(values);
            dispatch(setOpen({ type: "alertModal" }));
        } catch (error: any) {
            toast({
                title: "Something went Wrong",
                description:
                    error.response.data.errors[0].message ||
                    "Please try again ",
                action: (
                    <div className="h-8 w-8 bg-rose-500 text-white grid place-items-center rounded">
                        <X />
                    </div>
                ),
            });
        }
    };

    const isLoading = form.formState.isSubmitting;

    return (
        <>
            <AlertModal
                title="Reset Password Link Sent"
                description="a reset password email with a link is send to your account, please check it out!"
            />
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-lg">
                    <h1 className="text-center text-2xl font-bold text-blue-600 sm:text-3xl">
                        Reset your Password
                    </h1>
                    <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Obcaecati sunt dolores deleniti inventore quaerat
                        mollitia?
                    </p>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
                        >
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <p className="text-center text-lg font-medium">
                                            Enter your registered Email
                                        </p>
                                        <FormLabel className="sr-only"></FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Email"
                                                disabled={disable}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                disabled={isLoading || disable}
                                type="submit"
                                className="block w-full rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white"
                            >
                                {isLoading ? <Loader2 /> : "Submit"}
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </>
    );
};

export default Forgotpassword;

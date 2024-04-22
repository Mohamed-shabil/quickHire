"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { axiosInstance } from "@/axios/axios";
import { useRouter } from "next/navigation";
import { Pencil, Plus } from "lucide-react";
import { Subscription } from "@/types/types";
import { toast } from "@/components/ui/use-toast";

export default function SubscriptionModal({
    subscription,
}: {
    subscription?: Subscription;
}) {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const formSchema = z.object({
        planName: z.string().min(3, {
            message: "Plan Name must be 3 characters long",
        }),
        price: z.string({
            required_error: "Price can't be empty",
        }),
        postLimit: z.string().min(1, {
            message: "Post Limit can't be empty",
        }),
        description: z.string().min(4, {
            message: "Description must be atleast 10 characters long",
        }),
        billingPeriod: z.string({
            required_error: "Billion Duration Can't be empty",
        }),
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            planName: subscription?.planName || "",
            postLimit: subscription?.postLimit + "" || "",
            price: subscription?.price + "" || "",
            description: subscription?.description || "",
            billingPeriod: subscription?.billingPeriod || "",
        },
        mode: "onTouched",
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values);
        if (subscription) {
            axiosInstance
                .post(
                    `/api/payments/subscription/edit/${subscription._id}`,
                    values
                )
                .then((res) => {
                    toast({
                        title: "Subscription Edited successfully",
                    });
                    console.log(res.data);
                })
                .catch((err) => {
                    toast({
                        title: "Subscription Edited successfully",
                        description: err.response.errors[0].message,
                    });
                })
                .finally(() => {
                    onClose();
                    router.refresh();
                });
        } else {
            axiosInstance
                .post("/api/payments/subscription/new", values)
                .then((res) => {
                    console.log(res.data);
                    onClose();
                    router.refresh();
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const onClose = () => {
        form.reset();
        setOpen(false);
    };

    const isLoading = form.formState.isSubmitting;
    return (
        <Dialog
            open={open}
            onOpenChange={(e) => {
                form.reset();
                setOpen(e);
            }}
        >
            <DialogTrigger asChild>
                <Button variant="outline" className="">
                    {subscription ? <Pencil /> : <Plus />}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[650px]">
                <DialogHeader>
                    <DialogTitle>Create Subscription</DialogTitle>
                    <DialogDescription>
                        {
                            "Make changes to your profile here. Click save when you're done."
                        }
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="grid grid-cols-6 gap-6"
                    >
                        <div className="col-span-6 sm:col-span-3">
                            <FormField
                                name="planName"
                                disabled={isLoading}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel> Plan Name </FormLabel>
                                        <FormControl>
                                            <Input
                                                defaultValue={field.value}
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
                        <div className="col-span-6 sm:col-span-3">
                            <FormField
                                name="price"
                                disabled={isLoading}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel> Plan price </FormLabel>
                                        <FormControl>
                                            <Input
                                                defaultValue={field.value}
                                                type="number"
                                                className="mt-1 w-full rounded-md"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <FormField
                                control={form.control}
                                name="postLimit"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Job Post Limit</FormLabel>
                                        <Input
                                            defaultValue={field.value}
                                            type="number"
                                            className="mt-1 w-full rounded-md"
                                            {...field}
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <FormField
                                name="billingPeriod"
                                disabled={isLoading}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Billing Period</FormLabel>
                                        <Select onValueChange={field.onChange}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select End Year" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value={"week"}>
                                                    Weekly
                                                </SelectItem>
                                                <SelectItem value={"month"}>
                                                    Monthly
                                                </SelectItem>
                                                <SelectItem value={"year"}>
                                                    Yearly
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="col-span-6">
                            <FormField
                                name="description"
                                disabled={isLoading}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <Textarea
                                            {...field}
                                            placeholder="Write about the plan"
                                        ></Textarea>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter className="flex items-end col-span-6">
                            <Button type="submit" className="w-20">
                                Save
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

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
import { Loader2, Pencil, Plus } from "lucide-react";
import { Subscription } from "@/types/types";
import { toast } from "@/components/ui/use-toast";
import {
    createSubscriptionPlan,
    editSubscription,
} from "@/services/api/payments.service";

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

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
        if (subscription) {
            try {
                const response = await editSubscription(values);
                toast({
                    title: "Subscription Edited successfully",
                });
                console.log(response.data);
                onClose();
                router.refresh();
            } catch (error: any) {
                toast({
                    title: "Subscription Edited successfully",
                    description: error.response.errors[0].message,
                });
            }
        } else {
            try {
                const response = await createSubscriptionPlan(values);
                console.log(response);
                toast({
                    title: "Subscription created!",
                });
                onClose();
                router.refresh();
            } catch (error: any) {
                console.log(error);
                toast({
                    title: "Something went wrong try again!",
                });
            }
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

"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Loader2 as Loader } from "lucide-react";
import { useRouter } from "next/navigation";

export const Searchjob = () => {
    const router = useRouter();
    const queryParams: { [key: string]: string } = {};

    const formSchema = z.object({
        location: z.string().optional(),
        experience: z.string().optional(),
        title: z.string().optional(),
    });
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            experience: "",
            location: "",
        },
    });
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        if (values.title) {
            queryParams.title = values.title;
        }
        if (values.location) {
            queryParams.location = values.location;
        }
        if (values.experience) {
            queryParams.experience = values.experience;
        }

        const url = `jobs${
            queryParams ? `?${new URLSearchParams(queryParams)}` : ""
        }`;
        router.push(url);
    };

    const isLoading = form.formState.isSubmitting;

    return (
        <div className="flex w-full max-w-[700px] p-5 flex-col">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="w-full flex items-center relative mb-3">
                        <FormField
                            name="title"
                            disabled={isLoading}
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Input
                                            type="text"
                                            className="pl-4 py-6"
                                            {...field}
                                            placeholder="Enter Job title"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            className="absolute top-1 right-1"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? <Loader /> : "Search"}
                        </Button>
                    </div>
                    <div className="w-full flex gap-2">
                        <FormField
                            control={form.control}
                            name="experience"
                            render={({ field }) => (
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select Experience" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>
                                                Select Experience
                                            </SelectLabel>
                                            <SelectItem value="intern">
                                                Intern
                                            </SelectItem>
                                            <SelectItem value="fresher">
                                                Fresher
                                            </SelectItem>
                                            <SelectItem value="associate">
                                                Associate
                                            </SelectItem>
                                            <SelectItem value="mid-level">
                                                Mid Level
                                            </SelectItem>
                                            <SelectItem value="senior">
                                                Senior
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    className="w-full max-w-44"
                                    placeholder="Location"
                                />
                            )}
                        />
                    </div>
                </form>
            </Form>
        </div>
    );
};

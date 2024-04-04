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
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function subscriptionModal() {
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
      planName: "",
      postLimit: "",
      price: "",
      description: "",
      billingPeriod: "",
    },
    mode: "onTouched",
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    axios
      .post(
        "http://localhost:3007/api/payments/subscription/new",
        {
          ...values,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data);
        onClose();
        router.refresh();
      });
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
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle>Create Subscription</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
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
                        <SelectItem value={"week"}>Weekly</SelectItem>
                        <SelectItem value={"month"}>Monthly</SelectItem>
                        <SelectItem value={"year"}>Yearly</SelectItem>
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
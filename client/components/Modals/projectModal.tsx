import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { axiosInstance } from "@/axios/axios";
import { toast } from "@/components/ui/use-toast";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/reducers";
import { setClose } from "@/store/slices/modalSlice";
import { Check, Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";

import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { url } from "inspector";

export function ProjectFormModal() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [inputValue, setInputValue] = useState<string>("");
    const [skills, setSkills] = useState<string[]>([]);

    const formSchema = z
        .object({
            projectName: z.string(),
            description: z.string(),
            currentlyWorkingOn: z.boolean(),
            startDate: z.date(),
            endDate: z.date(),
            links: z.string(),
        })
        .refine((data) => data.endDate > data.startDate, {
            message: "Starting date must be less than ending date",
            path: ["endDate"],
        });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            projectName: "",
            description: "",
            currentlyWorkingOn: false,
            startDate: new Date(),
            endDate: new Date(),
            links: "",
        },
        mode: "onTouched",
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        const data = {
            ...values,
            skills,
        };
        console.log(data);
        axiosInstance
            .patch("/api/profile/project", data)
            .then((res) => {
                toast({
                    title: "Your account has been created ",
                    description: "Welcome to QuickHire",
                    action: (
                        <div className="h-8 w-8 bg-emerald-500 text-white grid place-items-center rounded">
                            <Check />
                        </div>
                    ),
                });
                form.reset();
                onClose();
                router.refresh();
            })
            .catch((err) => {
                console.log({ err });
                toast({
                    title: "Something went Wrong",
                    description: err.response.data.errors[0].message || "",
                    action: (
                        <div className="h-8 w-8 bg-rose-500 text-white grid place-items-center rounded">
                            <X />
                        </div>
                    ),
                });
            })
            .finally(() => {});
    };

    const onClose = () => {
        dispatch(setClose());
    };

    const handleAddSkill = () => {
        if (inputValue.trim() !== "") {
            setSkills([...skills, inputValue.trim()]);
            setInputValue("");
        }
    };
    //   const isLoading = form.formState.isSubmitting;
    const user = useSelector((state: RootState) => state.user.userData);
    const open = useSelector((state: RootState) => state.modal.open);
    const type = useSelector((state: RootState) => state.modal.type);

    const isModalOpen = open && type === "ProjectFormModal";

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Project Section</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="grid grid-cols-6 gap-6"
                    >
                        <div className="col-span-6">
                            <FormField
                                name="projectName"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Project Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                className="w-full rounded-md"
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
                                name="description"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel> Description </FormLabel>
                                        <FormControl className="max-h-28">
                                            <Textarea
                                                className="w-full rounded-md"
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
                                control={form.control}
                                name="links"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Links </FormLabel>
                                        <Input type="text" {...field} />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="col-span-6">
                            <FormField
                                name=""
                                render={() => (
                                    <FormItem>
                                        <FormLabel>Skills</FormLabel>
                                        <FormDescription>
                                            Enter each skills and click the add
                                            button
                                        </FormDescription>
                                        {skills.map((skill, index) => (
                                            <span
                                                className="whitespace-nowrap rounded-full capitalize bg-blue-100 px-2.5 py-0.5 text-sm text-blue-700 mx-1"
                                                key={index}
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    placeholder="Nodejs, react"
                                                    value={inputValue}
                                                    onChange={(e) =>
                                                        setInputValue(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <Button
                                                    className="absolute top-2 right-1"
                                                    type="button"
                                                    variant={"fade"}
                                                    size={"mini"}
                                                    onClick={handleAddSkill}
                                                >
                                                    <Plus />
                                                </Button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <FormField
                                control={form.control}
                                name="startDate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Start date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "text-left font-normal h-12",
                                                            !field.value &&
                                                                "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(
                                                                field.value,
                                                                "PPP"
                                                            )
                                                        ) : (
                                                            <span>
                                                                Start date
                                                            </span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                className="w-auto p-0"
                                                align="start"
                                            >
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <FormField
                                control={form.control}
                                name="endDate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>End date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "text-left font-normal h-12",
                                                            !field.value &&
                                                                "text-muted-foreground"
                                                        )}
                                                        onChange={() => {
                                                            form.trigger(
                                                                "startDate"
                                                            );
                                                        }}
                                                    >
                                                        {field.value ? (
                                                            format(
                                                                field.value,
                                                                "PPP"
                                                            )
                                                        ) : (
                                                            <span>
                                                                Start date
                                                            </span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                className="w-auto p-0"
                                                align="start"
                                            >
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter>
                            <Button type="submit">Submit</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

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
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { date, string, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { axiosInstance } from "@/axios/axios";
import { toast } from "../ui/use-toast";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/reducers";
import { setClose } from "@/store/slices/modalSlice";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Check, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Experience } from "@/types/types";

export function ExperienceFormModal() {
    const dispatch = useDispatch();

    const user = useSelector((state: RootState) => state.user.userData);
    const open = useSelector((state: RootState) => state.modal.open);
    const type = useSelector((state: RootState) => state.modal.type);
    const experience = useSelector(
        (state: RootState) => state.modal.data
    ) as Experience;
    const isModalOpen = open && type === "ExperienceFormModal";

    const router = useRouter();
    const months = [
        { label: "January", value: "1" },
        { label: "February", value: "2" },
        { label: "March", value: "3" },
        { label: "April", value: "4" },
        { label: "May", value: "5" },
        { label: "June", value: "6" },
        { label: "July", value: "7" },
        { label: "August", value: "8" },
        { label: "September", value: "9" },
        { label: "Octobar", value: "10" },
        { label: "Nevember", value: "11" },
        { label: "December", value: "12" },
    ];

    const currentYear = new Date().getFullYear();
    const years: string[] = [];
    for (let i = currentYear; i >= currentYear - 99; i--) {
        years.push(i.toString());
    }

    const formSchema = z
        .object({
            companyName: z.string().min(4, {
                message: "company name must be more than 3 characters long",
            }),
            startMonth: z.string({
                required_error: "Please Select a Month",
            }),
            endMonth: z.string({
                required_error: "Please Select a Month",
            }),
            startYear: z.string({
                required_error: "Please Select a Year",
            }),
            endYear: z.string({
                required_error: "Please Select a Year",
            }),
            position: string().min(3, {
                message: "Degree must be 3 atleast Letters long",
            }),
        })
        .refine(
            (data) => {
                const startMonth = parseInt(data.startMonth);
                const startYear = parseInt(data.startYear);
                const endMonth = parseInt(data.endMonth);
                const endYear = parseInt(data.endYear);
                if (startYear > endYear) {
                    return false;
                }
                if (startYear === endYear && startMonth > endMonth) {
                    return false;
                }
                return true;
            },
            {
                message:
                    "Starting date must be less than or equal to ending date",
                path: ["endYear"],
            }
        );

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            companyName: "",
            position: "",
            startYear: "",
            startMonth: "",
            endYear: "",
            endMonth: "",
        },
        mode: "onTouched",
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values);
        axiosInstance
            .post("/api/profile/experience", values)
            .then((res) => {
                console.log(res);
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
                    title: "Something Went Wrong!😥",
                    description: err.response.data.errors[0].message || "",
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

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Experience Section</DialogTitle>
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
                                name="companyName"
                                disabled={isLoading}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel> Company Name </FormLabel>
                                        <FormControl>
                                            <Input
                                                // defaultValue={experience.companyName || ''}
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
                        <div className="col-span-6">
                            <FormField
                                name="position"
                                disabled={isLoading}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Position</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                // defaultValue={experience.companyName || ''}
                                                defaultValue={field.value}
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
                                name="startMonth"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Start Month</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            // defaultValue={experience.companyName || ''}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Start Month display" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {months.map((month, i) => (
                                                    <SelectItem
                                                        key={i}
                                                        value={month.value}
                                                    >
                                                        {month.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <FormField
                                name="startYear"
                                disabled={isLoading}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Start Year</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            // defaultValue={experience.companyName || ''}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select End Year" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {years.map((year, i) => (
                                                    <SelectItem
                                                        key={i}
                                                        value={year}
                                                    >
                                                        {year}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <FormField
                                control={form.control}
                                name="endMonth"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>End Month</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            // defaultValue={experience.companyName || ''}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select End Month" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {months.map((month, i) => (
                                                    <SelectItem
                                                        key={i}
                                                        value={month.value}
                                                    >
                                                        {month.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <FormField
                                name="endYear"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>End Year</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            // defaultValue={experience.companyName || ''}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select End Year" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {years.map((year, i) => (
                                                    <SelectItem
                                                        key={i}
                                                        value={year}
                                                    >
                                                        {year}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter>
                            <Button type="submit">Save</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

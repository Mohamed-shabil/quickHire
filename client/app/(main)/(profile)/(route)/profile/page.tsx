"use client";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import router from "next/router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Button } from "@/components/ui/button";
import { Building2, CalendarClock, Gem, MapPin, MoreVertical, Pencil, Plus, User } from "lucide-react";
const Profile = () => {
  const formSchema = z.object({
    email: z.string().email({
      message: "Invalid email format",
    }),
    password: z.string().min(4, {
      message: "Password must be 4 characters long",
    }),
    name: z.string().min(3, {
      message: "Username must be 4 characters long",
    }),
    phone: z
      .string()
      .min(10, {
        message: "Phone number must be 10 numbers long",
      })
      .max(10, {
        message: "Phone number can't be morethan 10 numbers long",
      })
      .refine((value) => !isNaN(Number(value)), {
        message: "Phone number must be a valid number.",
      }),
    ConfirmPassword: z.string().min(4, {
      message: "Password must be 4 characters long",
    }),
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      phone: "",
      ConfirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    axios
      .post("https://quickhire.com/api/users/signup", values)
      .then((res) => {
        return router.push("/");
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: err.response.data.error,
        });
      });
  };
  const isLoading = form.formState.isSubmitting;

  return (
    <div className="w-full pt-4">
      <div className="lg:container md:container w-full px-2">
        <Image src={'/coverImage.png'} width={1000} height={300} alt={"cover Image"} className="w-full rounded-t-md"/>
        <div className="flex justify-center flex-col w-full items-center -mt-10 md:-mt-12 lg:-mt-16 mb-10">
          <Image src={'/user.png'} alt={"user"} width={120} height={120} className="w-20 lg:w-32 md:w-24 rounded-full border-4 border-spacing-10 border-blue-500"/>
          <h3 className="font-medium text-2xl text-slate-500">Mohamed Shabil</h3>
          <p className="p-2 text-md text-slate-500">Backend Developer</p>
          <div className="flex gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Add Profile Sections</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Add About Section</DropdownMenuItem>
                <DropdownMenuItem>Add Experience Section</DropdownMenuItem>
                <DropdownMenuItem>Add Education Section</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button ><MoreVertical /></Button>
          </div>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="posts">Posts</TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            
            
          </TabsContent>
          <TabsContent value="posts">
            <h2>Posts</h2>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;

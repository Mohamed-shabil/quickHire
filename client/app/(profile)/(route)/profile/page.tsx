"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import router from "next/router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import { ArrowUpRightFromSquare, Building2, CalendarDays, FilePenLine, Gem, GraduationCap, Pencil, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

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
    <div className="container w-full md:px-5 sm:px-0 flex items-center mb-96">
      <div className="w-full max-w-[1200px] mx-auto flex flex-row gap-4">
        <div>
          <div className="shadow-sm border rounded-lg">
            <div>
              <div className="h-auto w-full">
                <Image
                  src="/coverImage.png"
                  alt="Image"
                  width={600}
                  height={200}
                  className="w-full rounded-t-lg"
                />
              </div>
              <div className="px-5 w-full flex items-center flex-col pb-9">
                <div className="profile-image w-36 h-36 relative -mt-16 ">
                  <Image
                    src={"/user.png"}
                    className="h-full w-full"
                    alt="profile"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="w-full  px-2 text-center">
                  <h1 className="text-2xl">Mohamed Shabil</h1>
                  <p className="text-center">Mern Stack Developer</p>
                  <p className="text-center">Kerala, India</p>
                </div>
              </div>
            </div>
          </div>

          <div className="shadow-sm border rounded-lg mt-3 py-3 px-5">
            <div className="my-4 flex flex-row items-center justify-between">
              <h1 className="font-medium text-xl top-1">About</h1>
              <Button variant="ghost" className="m-0">
                <Pencil />
              </Button>
            </div>
            <div>
              <p className="text-wrap mt-2 mb-5">
                Hello there! Iam Mohamed Shabil, a passionate Full Stack
                Developer with a specialization in MERN MongoDB, Express.js,
                React, Node.js technology stack. I thrive on transforming
                innovative ideas into functional and user-friendly digital
                solutions.
              </p>
            </div>

            <div className="flex flex-col border px-2 py-2 rounded-md">
              <div className="Skills flex gap-3 w-full pb-3">
                <Gem /> <h1 className="font-medium">Skills</h1>
              </div>
              <div className="px-2">
                <ul className="list-inside font- flex space-x-4 *:rounded-full *:text-blue-600 *:border *:border-sky-100 *:bg-sky-50 *:px-3 *:py-0.5 dark:text-blue-600 light:text-sky-600 dark:*:border-sky-500/15 dark:*:bg-sky-500/10">
                  <li>TypeScript</li>
                  <li>Kubernetes</li>
                  <li>Docker</li>
                  <li>Nodejs</li>
                  <li>Kafka</li>
                </ul>
              </div>
            </div>
          </div>

            {/* Activity */}

            <div className="shadow-sm border rounded-lg mt-3 py-3 px-5">
                <div className="my-4 flex flex-row items-center justify-between">
                <h1 className="font-medium text-xl top-1">Activity</h1>
                <Button
                    variant="outline"
                    className="m-0 border-blue-600 rounded-full text-blue-600 hover:bg-blue-500 hover:text-blue-50"
                >
                    Create a Post
                </Button>
                </div>

                <div className="flex items-stretch gap-4 mb-2">
                    <Image
                        src={'/post1.jpg'}
                        alt="post"
                        width={150}
                        height={150}
                        className="aspect-square w-30 rounded-lg object-cover"
                    />

                    <div className="flex flex-col justify-center">
                        <h3 className="text-lg/tight font-medium">Title goes here</h3>

                        <p className="mt-0.5">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates voluptas distinctio
                        nesciunt quas non animi.
                        </p>
                    </div>
                </div>
                <Separator/>

                <div className="flex items-stretch gap-4 mb-2 mt-2">
                    <Image src={'/post2.jpg'} alt="post" width={150} height={150} className="aspect-square w-30 rounded-lg object-cover"/>

                    <div className="flex flex-col justify-center">
                        <h3 className="font-medium">Title goes here</h3>
                        <p className="mt-0.5 ">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates voluptas distinctio
                        nesciunt quas non animi.
                        </p>
                    </div>
                </div>
            </div>

            {/* Experience */}

            <div className="shadow-sm border rounded-lg mt-3  px-5">
                <div className="my-4 flex flex-row items-center justify-between">
                    <h1 className="font-medium text-xl top-1">Experience</h1>
                    <Button variant="ghost" className="m-0">
                        <Plus />
                    </Button>
                </div>
                
                <div className="flex flex-col px-2 py-2 rounded-md">
                    {/* <div className="Skills flex gap-3 w-full pb-3">
                    </div> */}
                    <div className="px-2 flex flex-row gap-2">
                        <Building2 className="text-2xl"/>
                        <div>
                            <p className="font-bold">Full Stack Developer</p>
                            <p className="font-medium">Dot pixel · Full-time</p>
                            <p>Dec 22 - jul 2023</p>
                            <p>Kerala, India</p>
                        </div>
                    </div>
                </div>
            </div>


            <div className="shadow-sm border rounded-lg mt-3  px-5">
                <div className="my-4 flex flex-row items-center justify-between">
                    <h1 className="font-medium text-xl top-1">Education</h1>
                    <Button variant="ghost" className="m-0">
                        <Plus />
                    </Button>
                </div>
                
                <div className="flex flex-col px-2 py-2 rounded-md">
                    {/* <div className="Skills flex gap-3 w-full pb-3">
                    </div> */}
                    <div className="px-2 flex flex-row gap-2">
                        <GraduationCap className="text-2xl"/>
                        <div>
                            <p className="font-bold">University of Calicut</p>
                            <p className="font-medium">Master of Computer Application</p>
                            <p>Nov 2020 - Apr 2023</p>
                            <p>Grade : A</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="shadow-sm border rounded-lg mt-3  px-5">
                <div className="my-4 flex flex-row items-center justify-between">
                    <h1 className="font-medium text-xl top-1">Projects</h1>
                    <Button variant="ghost" className="m-0">
                        <Plus />
                    </Button>
                </div>
                
                <div className="flex flex-col px-2 py-2 rounded-md">
                    <div>
                        <h1 className="font-bold">TrendVerse</h1>
                        <p>Oct 2023 - Dec 2023</p>
                        <p>TrendVerse is a feature-rich ecommerce application that includes modern
                            functionalities such as shopping cart, wishlist, checkout, referrals, wallet, 
                            SKU management, user management, authentication and authorization, offers, 
                            token-based authentication, Google authentication, coupons and more. This 
                            comprehensive platform offers a seamless and secure shopping experience 
                            with a wide range of cutting-edge features.
                        </p>
                        <h3 className="flex flex-inline gap-2 my-3 font-medium"><Gem /> Twilio, MongoDB</h3>
                        <div className="w-full">
                            <Link href='/signup' className="w-28 h-16 grid items-center justify-center bg-slate-50 rounded border border-slate-300 ">
                                <Image src={'/picture.png'} height={50} width={30} alt="picture"/>
                                <ArrowUpRightFromSquare className="z-10 relative left-10"/>
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    
        <div className="w-full ">
            <div className="flex items-stretch gap-4 border rounded-lg p-1 mb-2">
                <Image
                    width={50}
                    height={50}
                    src={'/user.png'}
                    alt="shabil"
                    className="aspect-square w-12 rounded-lg object-cover"
                />
                <div>
                    <h3 className="text-lg/tight font-medium ">Shabil</h3>
                    <p className="mt-0.5 ">Mern Stack Developer</p>
                </div>
            </div>
            <div className="flex items-stretch gap-4 border rounded-md p-1">
                <Image
                    width={50}
                    height={50}
                    src={'/user.png'}
                    alt="shabil"
                    className="aspect-square w-12 rounded-lg object-cover"
                />
                <div>
                    <h3 className="text-lg/tight font-medium ">Shabil</h3>
                    <p className="mt-0.5">Mern Stack Developer</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

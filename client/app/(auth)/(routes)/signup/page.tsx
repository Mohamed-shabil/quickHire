"use client"
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import {useDispatch } from "react-redux";
import { setUserData } from '@/store/slices/userSlice'

import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast, useToast } from "@/components/ui/use-toast";
import { Check, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function Signup() {
    const [show,setShow] = useState(false);
    const [error,SetError] = useState([{}]);
    const { toast } = useToast()
    const dispatch = useDispatch();
    const formSchema = z.object({
        email:z.string().email({
            message:'Invalid email format'
        }),
        password:z.string().min(4,{
            message:"Password must be 4 characters long"
        }),
        name:z.string().min(3,{
            message:"Username must be 4 characters long"
        }),
        phone:z.string().min(10,{
            message:"Phone number must be 10 numbers long"
        }).max(10,{
            message:"Phone number can't be morethan 10 numbers long"
        }).refine((value) => !isNaN(Number(value)), {
            message: 'Phone number must be a valid number.',
        }),
        ConfirmPassword:z.string().min(4,{
            message:"Password must be 4 characters long"
        }),
        OtpMethod:z.string({
            required_error: "You need to select a otp type.",
        }),
    });

    const form = useForm({  
        resolver:zodResolver(formSchema),
        defaultValues:{
            name:"",
            email:"",
            phone:'',
            password:"",
            ConfirmPassword:"",
            OtpMethod:'sms'
        },
        mode:"onTouched"
    });

    const router = useRouter();
    const onSubmit = async(values : z.infer<typeof formSchema>)=>{
        console.log(values);
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3001/api/users/signup',values).then(res=>{
            // console.log(res);
            dispatch(setUserData(res.data.user));
            toast({
                title: "Your account has been created ",
                description: "Welcome to QuickHire",
                action: (
                  <div className="h-8 w-8 bg-emerald-500 text-white grid place-items-center rounded"><Check /></div>
                ),
              })
            
            router.push('/verifyOtp');
        }).catch(err=>{
            console.log(err);
            
        })
    }
    const googleAuth = ()=>{
        axios.get('http://localhost:3001/api/users/oauth/google').then(res=>{
            console.log('res:', res);

        }).catch(err=>{
            console.log(err);
        })
    }
    const isLoading = form.formState.isSubmitting;

  return (
    <section className="w-full">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
            <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
                <Image
                    alt="Pattern"
                    src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                    className="absolute inset-0 h-full w-full object-cover"
                    width={500}
                    height={500}
                />
            </aside>
            <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="max-w-xl lg:max-w-3xl">
                <a className="block text-blue-600" href="/">
                    <span className="sr-only">Home</span>
                    <svg className="h-8 sm:h-10" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z" fill="currentColor" />
                    </svg>
                </a>

                <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                    Welcome to <span className="text-blue-600">QuickHire</span>🦑
                </h1>

                <p className="mt-4 leading-relaxed text-gray-500">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi nam dolorum aliquam,
                    quibusdam aperiam voluptatum.
                </p>
                <div className="col-span-6 flex items-center justify-center py-7 ">
                    <Link href={'/api/auth/signin'}>
                        <Button variant={"secondary"} onClick={googleAuth} className="w-full max-w-60 border gap-2">
                            <Image src={'/google.png'} alt={"google"} width={20} height={20}/>
                            Signin with Google
                        </Button>
                    </Link>
                </div>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                            <FormField
                                name="name"
                                disabled={isLoading}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="block text-sm font-medium">
                                            Username
                                        </FormLabel>
                                        <FormControl>
                                            <Input type="text" {...field} className="mt-1 w-full rounded-md" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <FormField
                                name="phone"
                                disabled={isLoading}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Phone
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                className="mt-1 w-full rounded-md"
                                                {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        

                        <div className="col-span-6">
                            <FormField
                                name="email"
                                disabled={isLoading}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel> Email </FormLabel>
                                        <FormControl>
                                            <Input
                                                className="mt-1 w-full rounded-md"
                                                {...field}/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <FormField
                                name="password"
                                disabled={isLoading}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel> Password </FormLabel>
                                        <FormControl>
                                        <div className="relative">
                                            <FormControl>
                                                <Input
                                                    type={show ? 'password' : 'text'}
                                                    className="mt-1 w-full relative"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                            <div onClick={()=>setShow(!show)}>
                                                {show ? <Eye className="absolute top-2 bottom-2 right-2"/> :<EyeOff className="absolute top-2 bottom-2 right-2" />}
                                            </div>
                                        </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <FormField
                                name="ConfirmPassword"
                                disabled={isLoading}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="relative">
                                        <FormLabel>
                                            Password Confirmation
                                        </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    className="mt-1 w-full relative"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="col-span-6">
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    name="OtpMethod"
                                    disabled={isLoading}
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>OTP Method</FormLabel>
                                            <RadioGroup defaultValue="email" className="grid grid-cols-2 gap-4">
                                                <div className="flex items-center space-x-2">
                                                    <Label
                                                        htmlFor="r1"
                                                        className="flex cursor-pointer justify-between gap-4 rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
                                                    >
                                                        SMS
                                                        <FormControl>
                                                            <RadioGroupItem value="sms" id="r1" />
                                                        </FormControl>
                                                    </Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <Label 
                                                        htmlFor="r2"
                                                        className="flex cursor-pointer justify-between gap-4 rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
                                                    >
                                                        Email
                                                        <FormControl>
                                                            <RadioGroupItem value="email" id="r2" />
                                                        </FormControl>
                                                    </Label>
                                                </div>
                                            </RadioGroup>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                            <Button
                                type="submit"
                                className="inline-block shrink-0 rounded-md border border-blue-600
                                bg-blue-600 px-12 py-3 text-sm font-medium text-white transition 
                                hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring
                                active:text-blue-500">
                                Create an account
                            </Button>

                            <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                                Already have an account?
                                <Link href="/signin" className="text-gray-700 underline">Log in</Link>.
                            </p>
                        </div>
                    </form>
                </Form>
             </div>
            </main>
        </div>
    </section>
  )
}



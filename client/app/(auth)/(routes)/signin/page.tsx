"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {number, z} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import axios from "axios";
import router from "next/router";
import { toast } from "@/components/ui/use-toast";

export default function Signup() {

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
    });
    const form = useForm({  
        resolver:zodResolver(formSchema),
        defaultValues:{
            email:"",
            password:"",
            name:"",
            phone:'',
            ConfirmPassword:""
        }
    });

    const onSubmit = async(values : z.infer<typeof formSchema>)=>{
        console.log('FORM VALUES :=',values);
        axios.post('https://quickhire.com/api/users/signup',values).then(res=>{
            return router.push('/')
        }).catch(err=>{
            toast({
                variant: "destructive",
                title: err.response.data.error,
            })
        })
    }
    const isLoading = form.formState.isSubmitting;
  return (
    <div className="flex justify-center w-full h-screen">
        <div className="w-1/3 object-contain mt-auto">
            <Image src={'/city.png'} width={400} height={300} className="w-full h-auto" alt={"city"}/>
        </div>
        <div className="w-1/3 h-100 flex justify-center flex-col px-10">
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-center">Signup</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="w-100">
                                <FormField
                                    disabled={isLoading}
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>User Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter username" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    disabled={isLoading}
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    disabled={isLoading}
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter phone number" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    disabled={isLoading}
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input placeholder="enter your password" type="password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    disabled={isLoading}
                                    control={form.control}
                                    name="ConfirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirm Password</FormLabel>
                                            <FormControl>
                                                <Input placeholder="confirm password" type="password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button className="w-full mt-4 cursor-pointer" disabled={isLoading}>
                                    SignUp
                                </Button>
                            </form>
                        </Form>   
                    </CardContent>
                </Card>
            </div>
        </div>
        <div className="w-1/3 p-3">
            <Image src="/alien-drop.png" width={300} height={300} alt={"alien"}/>
        </div>
    </div>
  )
}



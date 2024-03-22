'use client'
import React, { useRef, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter  } from '../ui/dialog'
import { Button } from '../ui/button'
import { FileText, FolderUp, Upload, Zap } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Jobs } from '@/constants/constants';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Input } from '../ui/input';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';

export default function ApplyJobModal({job}:{job:Jobs}) {
    const [open , setOpen] = useState(false); 
    const [resumes, setResumes] = useState<string[]>();
    const [loading , setLoading] = useState(false)
    const newResume = useRef<HTMLInputElement>(null);

    const formSchema = z.object({
        email: z.string(),
        phone:z.string().refine((data)=>{
            if(data){
                return parseInt(data)
            }
        },{
            message:'Phone Number must be Numbers'
        }),
        resume:z.string(),
    })

    const form = useForm({  
        resolver:zodResolver(formSchema),
        defaultValues :async ()=>{
            try {
                const response = await axios.get('http://localhost:3005/api/jobs/applicant-info',{
                    withCredentials:true
                })
                console.log(response);
                setResumes(response.data.resume)
                const data = {
                    email:response.data.user.email,
                    phone:response.data.user.phone,
                }
            } catch (error) {
                console.log(error);
            }
        },
        mode:"onTouched"
    });

    const onSubmit = (values: z.infer<typeof formSchema>)=>{

    }

    const uploadResume = async (event: React.ChangeEvent<HTMLInputElement>)=>{
        try {
            setLoading(true);
            const resume = newResume.current?.files?.[0];
            const data = new FormData();
            if(resume){
                data.append('resume',resume);
            } 
            const response = await axios.post('http://localhost:3005/jobs/upload-resume');
            
        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false);
        }
    }
    
    return (
        <Dialog open={open} onOpenChange={e=>setOpen(e)}>
            <DialogTrigger asChild>
                <Button>
                    Apply <Zap size={'1em'} />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] flex flex-col">
                <Form {...form}>
                    <DialogHeader>
                        <DialogTitle>Apply Job</DialogTitle>
                        <DialogDescription>
                            Fill the form to apply for the job. Click Apply job when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={form.handleSubmit(()=>{})} className='grid grid-cols-6 gap-6'>
                        <div className="col-span-6">
                            <FormField
                                name='email'
                                control={form.control}
                                render={({field})=>(
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                className='w-full rounded-md'
                                                placeholder='Enter your email'
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="col-span-6">
                            <FormField
                                name='phone'
                                control={form.control}
                                render={({field})=>(
                                    <FormItem>
                                        <FormLabel>Phone</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                className='w-full rounded-md'
                                                placeholder='Enter your Phone number'
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="col-span-6">
                            <FormField
                                name='resume'
                                control={form.control}
                                render={({field})=>(
                                    <FormItem>
                                        <FormLabel>Select Resume</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex flex-row space-y-1 flex-wrap"
                                            >
                                                <FormItem className="flex items-center space-x-3 space-y-0 max-w-[150px]">
                                                    <FormControl>
                                                        <label
                                                            htmlFor="DeliveryStandard"
                                                            className="max-w-[150px] flex cursor-pointer items-center justify-between gap-4
                                                            rounded-lg border border-gray-200 text-sm font-medium
                                                            shadow-sm has-[:checked]:border-blue-500 p-4
                                                            has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
                                                        >
                                                            <p className='truncate'>Standardasdfasdfasdfasdf</p>
                                                            <p>
                                                                <FileText size={'1.4em'}/>
                                                            </p>
                                                            <input
                                                                type="radio"
                                                                name="DeliveryOption"
                                                                value="DeliveryStandard"
                                                                id="DeliveryStandard"
                                                                className="sr-only"
                                                            />
                                                        </label>
                                                    </FormControl>
                                                </FormItem>                                        
                                            </RadioGroup>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="col-span-6">
                            <Label htmlFor='uploadResume' className='p-3 flex gap-2 items-center rounded-sm bg-blue-50 border max-w-[150px]'>
                                Upload Resume
                                <Input
                                    type="file"
                                    accept='application/pdf'
                                    className='hidden'
                                    id='uploadResume'
                                    ref={newResume}
                                    onChange={uploadResume}
                                />
                            </Label>
                        </div>
                        <DialogFooter className='flex items-center justify-end col-span-6'>
                            <Button type="submit">Apply Job</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}


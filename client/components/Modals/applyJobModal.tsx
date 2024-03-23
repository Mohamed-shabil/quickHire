'use client'
import React, { useRef, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter  } from '../ui/dialog'
import { Button } from '../ui/button'
import { Check, FileText, FileUp, FolderUp, Loader2, Upload, Zap } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Jobs } from '@/constants/constants';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Input } from '../ui/input';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { toast } from '../ui/use-toast';
import { Resume } from '@/constants/constants'

export default function ApplyJobModal({job}:{job:Jobs}) {
    const [open , setOpen] = useState(false); 
    const [resumes, setResumes] = useState<Resume[]>([]);
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
                console.log(response.data.user)
                if(response.data.user.resume){
                    setResumes(response.data.user.resume)
                }
                const data = {
                    email:response.data.user.email as string,
                    phone:response.data.user.phone as string,
                    resume:''
                }
                return data
            } catch (error) {
                console.log(error);
            }
        },
        mode:"onTouched"
    });

    const onSubmit = (values: z.infer<typeof formSchema>)=>{
        console.log(values);
        axios.post('http:localhost:3005/api/job/apply-job',values,{
            withCredentials:true
        })
        .then((res)=>{
            console.log(res);
            toast({
                title: "Your account has been created ",
                action: (
                  <div className="h-8 w-8 bg-emerald-500 text-white grid place-items-center rounded"><Check /></div>
                ),
              })
        })
        .catch(err=>{
            toast({
                title:'Something went wrong!😢',
                description:err.response.data
            })
        })
    }

    const uploadResume = async (event: React.ChangeEvent<HTMLInputElement>)=>{
        try {
            setLoading(true);
            const resume = newResume.current?.files?.[0];
            const data = new FormData();
            if(resume){
                data.append('resume',resume);
            } 
            const response = await axios.post('http://localhost:3005/api/jobs/upload-resume',data,{
                withCredentials:true
            });
            console.log(response.data)
            if(response.data.user.resume){
                setResumes(response.data.user.resume)
            }
            console.log(response.data);
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
                    <form onSubmit={form.handleSubmit(onSubmit)} className='grid grid-cols-6 gap-6'>
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
                                                {
                                                    resumes.length !=0 ? 
                                                    (
                                                        resumes.map((resume,index)=>(
                                                            <FormItem className="flex items-center space-x-3 space-y-0 max-w-[150px]" 
                                                                onClick={()=>{
                                                                    form.setValue('resume',resume.url)
                                                                }}>
                                                                <FormControl>
                                                                    <label
                                                                        htmlFor={index.toString()} 
                                                                        className="max-w-[150px] flex cursor-pointer items-center justify-between gap-4
                                                                        rounded-lg border border-gray-200 text-sm font-medium
                                                                        shadow-sm has-[:checked]:border-blue-500 p-4
                                                                        has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
                                                                    >
                                                                        <p className='truncate'>{resume.fileName}</p>
                                                                        <p>
                                                                            <FileText className='text-blue-500' size={'1.4em'}/>
                                                                        </p>
                                                                        <input
                                                                            type="radio"
                                                                            name="resume"
                                                                            value={resume.url}
                                                                            id={index.toString()}
                                                                            className="sr-only"
                                                                        />
                                                                    </label>
                                                                </FormControl>
                                                            </FormItem>
                                                        ))
                                                    ) : 
                                                    (
                                                        <h1 className='text-sm'>No Resumes are available</h1>
                                                    )
                                                }                                        
                                            </RadioGroup>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="col-span-6">
                            <Label htmlFor='uploadResume' className='p-2 py-4 flex justify-between items-center rounded-sm bg-blue-50 border max-w-[150px]'>
                                <span className='flex items-center justify-between w-full'>
                                    {loading ? 
                                        <Loader2 className='animate-spin'/> :
                                        <span className='w-full flex items-center justify-between'>
                                            <FileUp size={'1.4em'}/> Upload Resume
                                        </span>
                                    }
                                </span>
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


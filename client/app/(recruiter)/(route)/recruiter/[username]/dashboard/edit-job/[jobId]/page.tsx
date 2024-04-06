'use client'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from '@/components/ui/use-toast'
import { Jobs } from '@/constants/constants'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { Check, Plus, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import React,{ useEffect, useState} from 'react'
import { useForm } from 'react-hook-form'
import ReactQuill from 'react-quill'
import { z } from 'zod'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/reducers'

const EditJob = ({params}:{params:{jobId:string}}) => {
    const {jobId} = params
    const [ job,setJob] = useState<Jobs>();
    const router = useRouter();
    const user = useSelector((state:RootState)=>state.user.userData);
    
    useEffect(()=>{
        axios.defaults.withCredentials = true;
        axios.get(`http://localhost:3005/api/jobs/${jobId}`)
            .then((res)=>{
                console.log(res.data.job);
                setJob(res.data.job);
            })
            .catch((err)=>{
                toast({
                    title:"Something went wrong 😢",
                    description:'Please try again!',
                    action: (
                        <div className="h-8 w-8 bg-rose-500 text-white grid place-items-center rounded"><X/></div>
                    )
                })
            })
    },[]);

    const formSchema = z.object({
        title: z.string().min(5,{
          message:"Title Must be 5 characters long"
        }),
        company:z.string().min(3,{
          message:'Provide a valid Company Name'
        }),
        workplace:z.string(),
        location:z.string(),
        employmentType:z.string(),
        jobDescription:z.string().min(20,{
          message:'Job Description must be atleast 50 letters long'
        }),
        requirements:z.string().min(20,{
          message:"requirements must be atleast 10 letters long"
        }),
        minSalary:z.number(),
        maxSalary:z.number(),
        openings:z.number(),
        experience:z.string()
    });

    const removeSkills = (removeItem:string)=>{
        const filteredSkills = skills.filter(item=> item !== removeItem);
        setSkills(filteredSkills);
    }

    const form = useForm({  
        resolver:zodResolver(formSchema),
        defaultValues: async ()=>{
            try {
                axios.defaults.withCredentials = true;
                const response =  await axios.get(`http://localhost:3005/api/jobs/${jobId}`)
                setSkills(response.data.job.skills)
                setPreview(response.data.job.companyImage);
                return response.data.job
            } catch (error) {
                toast({
                    title:"Something went wrong 😢",
                    description:'Please try again!',
                    action: (
                        <div className="h-8 w-8 bg-rose-500 text-white grid place-items-center rounded"><X/></div>
                    )
                })
            }
        },
        mode:"onTouched"
    });

    const [inputValue, setInputValue] = useState<string>('');
    const [skills, setSkills] = useState<string[]>([]);
    const [preview,setPreview] = useState('');
    const [loading,setLoading] = useState(false);

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        setLoading(true)
        const selectedImage = document.getElementById('companyImage') as HTMLInputElement;
        const companyImage = selectedImage.files?.[0];
        
        const data = new FormData();
      

      
        if (companyImage) {
            data.append('companyImage',companyImage);
        }
        skills.forEach((item)=>{
            data.append('skills[]',item);
        })
      
        axios.patch(`http://localhost:3005/api/jobs/edit-job/${jobId}`,data,{
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
        })
        .then((res) => {
            toast({
                title: "Job edited successfully! 🥳",
                action: (
                    <div className="h-8 w-8 bg-emerald-500 text-white grid place-items-center rounded"><Check /></div>
                ),
            })
            console.log(res.data);
        })
        .catch((err) => {
            console.error('Error:', err);
            toast({
                title: "Something went Wrong",
                description: err.response.data.errors[0].message || "",
                action: (
                    <div className="h-8 w-8 bg-rose-500 text-white grid place-items-center rounded"><X /></div>
                ),
            })
        })
        .finally(()=>{
            setLoading(false);
            router.push(`/recruiter/${user?.name}/dashboard/my-jobs`)
        })
      };

    const handleAddSkill = () => {
        if (inputValue.trim() !== '') {
          setSkills([...skills, inputValue.trim()]);
          setInputValue('')
        }
    };

    const isLoading = form.formState.isSubmitting;

    return (
        <div className='w-full container flex items-center justify-center'>
            <div className='w-full max-w-[700px]'>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} >
                        <div className="grid grid-cols-6 gap-2">
                            <div className="col-span-3 ">
                                <FormField
                                    name="title"
                                    disabled={isLoading}
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel> Title </FormLabel>
                                            <FormControl>
                                            <Input
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
                            <div className="col-span-3 mt-1">
                                <FormField
                                    name="company"
                                    disabled={isLoading}
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Company</FormLabel>
                                            <FormControl>
                                            <Input
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
                                    name=""
                                    render={({}) => (
                                    <FormItem>
                                        <FormLabel>Company Logo</FormLabel>
                                        <FormControl>
                                            <div className="flex justify-center flex-col items-center w-full">
                                            <FormLabel htmlFor="companyImage" className="w-24 border cursor-pointer flex justify-center p-2 rounded-full">
                                                <Image src={preview ? preview :'/upload.png'} 
                                                width={100} height={100} alt="Company Image"
                                                className="object-cover"/>
                                                <Input
                                                type="file"
                                                accept="image/*"
                                                id="companyImage"
                                                className="hidden"
                                                onChange={({target})=>{
                                                    if(target.files){
                                                    setPreview(URL.createObjectURL(target.files[0]))
                                                    }
                                                }}
                                                />
                                            </FormLabel>
                                                <p className="text-gray-500 text-sm">Upload a 4:4 Size</p>
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
                                    name="employmentType"
                                    render={({ field }) => (
                                        <FormItem>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Employment Type" />
                                            </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value='Part-time'>Part-time</SelectItem>
                                                <SelectItem value='Full-time'>Full-time</SelectItem>
                                                <SelectItem value='Internship'>Internship</SelectItem>
                                                <SelectItem value='Freelance'>Freelance</SelectItem>
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
                                    name="workplace"
                                    render={({ field }) => (
                                        <FormItem>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Work Place Type" />
                                            </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value='Onsite'>Onsite</SelectItem>
                                                <SelectItem value='Remote'>Remote</SelectItem>
                                                <SelectItem value='Hybrid'>Hybrid</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="col-span-6">
                                <FormField
                                    name="location"
                                    disabled={isLoading}
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Location</FormLabel>
                                            <FormControl>
                                            <Input
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
                            <div className="col-span-6 mt-1 mb-2">
                                <FormField
                                    name=""
                                    render={() => (
                                    <FormItem>
                                        <FormLabel>Skills</FormLabel>
                                        <FormDescription>Enter each skills and click the add button</FormDescription>
                                        <div className='flex flex-row'>
                                            {skills.map((skill)=>(
                                                <span className="flex flex-row w-min items-center  whitespace-nowrap rounded-full capitalize bg-blue-100 px-2.5 py-0.5 text-sm text-blue-700 mx-1">
                                                    {skill} <X size={'1.2em'} className='cursor-pointer' onClick={()=>{removeSkills(skill)}}/>
                                                </span>
                                            ))}
                                        </div>
                                        <FormControl>
                                            <div className="relative">
                                            <Input placeholder="Nodejs, react" value={inputValue} onChange={(e)=>setInputValue(e.target.value)}/>
                                            <Button className="absolute top-2 right-1 " type='button' variant={'fade'} size={'mini'} 
                                                onClick={handleAddSkill}>
                                                <Plus />
                                            </Button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                                />
                            </div>
                            <div className="col-span-6 mt-1">
                                <FormField
                                    name="jobDescription"
                                    disabled={isLoading}
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Job Description</FormLabel>
                                            <FormControl className="overflow-auto">
                                            <ReactQuill
                                                {...field}
                                                theme="snow"
                                            />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                )}
                                />
                            </div>
                            <div className="col-span-6 mt-1 mb-2">
                                <FormField
                                    name="requirements"
                                    disabled={isLoading}
                                    control={form.control}
                                    render={({ field }) => (
                                    <FormItem className="overflow-auto">
                                        <FormLabel>Job Requirements</FormLabel>
                                        <FormControl>
                                        <ReactQuill
                                                {...field}
                                                theme="snow"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                                />
                            </div>
                            
                            <div className="col-span-6 sm:col-span-3">
                                <FormField
                                    name="minSalary"
                                    disabled={isLoading}
                                    control={form.control}
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Salary</FormLabel>
                                            <FormControl>
                                            <Input {...field} placeholder="Min" type="text"/>
                                            </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                                />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <FormField
                                    name="maxSalary"
                                    disabled={isLoading}
                                    control={form.control}
                                    render={({ field }) => (
                                    <FormItem className="mt-8">
                                            <FormControl>
                                            <Input {...field} placeholder="Max"/>
                                            </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                                />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <FormField
                                    name="openings"
                                    disabled={isLoading}
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Openings</FormLabel>
                                            <FormControl>
                                                <Input
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
                                    control={form.control}
                                    name="experience"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Experience</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Experience Level" />
                                            </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value='Intern'>Intern</SelectItem>
                                                <SelectItem value='Fresher'>Fresher</SelectItem>
                                                <SelectItem value='MidSenior'>Mid Senior level</SelectItem>
                                                <SelectItem value='Senior'>Senior</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <div className='w-full my-4 flex justify-end '>
                            <Button>
                                Submit
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default EditJob
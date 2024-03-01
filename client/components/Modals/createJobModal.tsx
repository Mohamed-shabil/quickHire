import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import {  any, z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useSelector,useDispatch } from "react-redux"
import { RootState } from "@/store/reducers";
import {setClose} from '@/store/slices/modalSlice'
import { ArrowLeft, ArrowRight, Plus,} from "lucide-react"
import { animate, motion } from 'framer-motion'
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Textarea } from "../ui/textarea"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Image from "next/image"



interface JobFormData {
  title: string;
  company: string;
  workplace: string;
  employmentType: string;
  jobDescription: string;
  requirements: string;
  minSalary?: string;
  maxSalary?: string;
  [key: string]: string | undefined; // Index signature allowing any string key
}
export function CreateJobModal() {
const router  = useRouter();
const dispatch = useDispatch();
const [formStep,setFormStep] = useState(0);
const [inputValue, setInputValue] = useState<string>('');
const [skills, setSkills] = useState<string[]>([]);
const [preview,setPreview] = useState('');
const [loading,setLoading] = useState(false);
console.log("skills",skills)

const formSchema = z.object({
    title: z.string().min(5,{
      message:"Title Must be 5 characters long"
    }),
    company:z.string().min(3,{
      message:'Provide a valid Company Name'
    }),
    workplace:z.string(),
    employmentType:z.string(),
    jobDescription:z.string().min(20,{
      message:'Job Description must be atleast 50 letters long'
    }),
    requirements:z.string().min(20,{
      message:"requirements must be atleast 10 letters long"
    }),
    minSalary:z.string().refine((data)=>{
      if(data){
        return parseInt(data)
      }
    },{
      message:'Minimum Salary Must be a Number'
    }),
    maxSalary:z.string().refine((data)=>{
      if(data){
        return parseInt(data)
      }
    },{
      message:'Maximum Salary Must be a Number'
    })
});
const form = useForm({  
    resolver:zodResolver(formSchema),
    defaultValues:{
        title:'',
        company:'',
        workplace:'',
        employmentType:'',
        jobDescription:'',
        requirements:'',
        minSalary:'',
        maxSalary:'',
    },
    mode:"onTouched"
});


const onSubmit = (values: z.infer<typeof formSchema>) => {
  const selectedImage = document.getElementById('companyImage') as HTMLInputElement;
  const companyImage = selectedImage.files?.[0];
  
  const data = new FormData();

  // console.log(values.title)
  data.append('title','Im Sahgil');
  data.append('company', values.company);
  data.append('workplace', values.workplace);
  data.append('employmentType', values.employmentType);
  data.append('jobDescription', values.jobDescription);
  data.append('requirements', values.requirements);
  data.append('minSalary', values.minSalary);
  data.append('maxSalary', values.maxSalary);

  if (companyImage) {
    data.append('companyImage', companyImage);
  }
  skills.forEach((item)=>{
    data.append('skills[]',item);
  })


  axios.post('http://localhost:3005/api/jobs/createJobs',data,{
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: true,
  })
  .then((res) => {
    console.log(res.data);
    form.reset();
    router.refresh();
  })
  .catch((error) => {
    console.error('Error:', error);
  });
};

  
const onClose =()=>{
  dispatch(setClose())
}
const isLoading = form.formState.isSubmitting;
const user = useSelector((state:RootState)=>state.user.userData)
const open = useSelector((state:RootState)=>state.modal.open)
const type = useSelector((state:RootState)=>state.modal.type)



const handleAddSkill = () => {
  if (inputValue.trim() !== '') {
    setSkills([...skills, inputValue.trim()]);
    setInputValue('')
  }
};
const isModalOpen = open && type === 'createJob';

return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] min-h-max">
        <DialogHeader>
          <DialogTitle>Post a Job</DialogTitle>
          <DialogDescription>
            Fill all the forms and Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form} >
          <form onSubmit={form.handleSubmit(onSubmit)} >
            <div className={cn('grid grid-cols-6 gap-2',{
              hidden: formStep !=0
            })}
            >
              <div className="col-span-6">
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
              <div className="col-span-6 mt-1">
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
              <div className="col-span-6 mt-1 mb-2">
                <FormField
                    name=""
                    render={() => (
                      <FormItem>
                          <FormLabel>Skills</FormLabel>
                          <FormDescription>Enter each skills and click the add button</FormDescription>
                          {skills.map((skill)=>(
                            <span className="whitespace-nowrap rounded-full capitalize bg-blue-100 px-2.5 py-0.5 text-sm text-blue-700 mx-1">
                              {skill}
                          </span>
                          ))}
                          <FormControl>
                            <div className="relative">
                              <Input placeholder="Nodejs, react" value={inputValue} onChange={(e)=>setInputValue(e.target.value)}/>
                              <Button className="absolute top-2 right-1 " variant={'fade'} size={'mini'} 
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
              <div className="col-span-6">
                <Button type="button" variant={'fade'} className="border gap-1" 
                  onClick={()=>{
                    form.trigger(['title','company','employmentType','workplace']);
                    const titleState = form.getFieldState('title')
                    const companyState = form.getFieldState('company')
                    const employmentTypeState = form.getFieldState('employmentType')
                    const workplaceState = form.getFieldState('workplace')
                    if(!titleState.isDirty || titleState.invalid) return ;
                    if(!companyState.isDirty || companyState.invalid) return ;
                    if(!employmentTypeState.isDirty || employmentTypeState.invalid) return ;
                    if(!workplaceState.isDirty || workplaceState.invalid) return ;
                    setFormStep(1)
                  }}>
                  Next <ArrowRight className="w-4 h-4"/>
                </Button>
              </div>
            </div>
            <div className={cn(' grid grid-cols-6 gap-2 p-1 ',{
              hidden: formStep !=1
            })}>
              <div className="col-span-6 mt-1">
                <FormField
                    name="jobDescription"
                    disabled={isLoading}
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Job Description</FormLabel>
                            <FormControl className="overflow-auto max-h-60">
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
                      <FormItem className="overflow-auto max-h-60">
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
              <Button variant={'fade'} onClick={()=>{setFormStep(0)}}>
                <ArrowLeft className="w-4 h-4"/> Go Back
              </Button>
              <Button variant={'fade'} onClick={()=>{
                form.trigger(['employmentType','requirements']);
                const employmentTypeState = form.getFieldState('employmentType')
                const requirementsState = form.getFieldState('requirements')
                const data = form.getValues('jobDescription');
                console.log('JD',data)
                console.log({employmentTypeState,requirementsState});

                if(employmentTypeState.invalid) return ;
                if(requirementsState.invalid) return ;
          
                setFormStep(2)
              }}>
                Next <ArrowRight className="w-4 h-4"/>
              </Button>
            </div>
            <div className={cn('grid grid-cols-6 gap-2',{
              hidden: formStep !=2
            })}>
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
              <Button variant={'fade'} onClick={()=>{setFormStep(1)}}>
                <ArrowLeft className="w-4 h-4"/> Go Back
              </Button>
              <Button variant={'default'}>
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

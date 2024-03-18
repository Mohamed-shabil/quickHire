'use client'
import { Button } from "@/components/ui/button";


import { redirect, useRouter } from "next/navigation"

import { setOpen } from "@/store/slices/modalSlice";
import { useDispatch,useSelector } from "react-redux";
import { RootState } from "@/store/reducers";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Jobs } from "@/constants/constants";
import { toast } from "@/components/ui/use-toast";
import { JobCard } from "@/components/Recruiter/JobCard";

export default function CreateJob() {
    const router = useRouter();
    const dispatch = useDispatch();
    const user = useSelector((state:RootState)=>(state.user.userData));
    const [jobs,setJobs] = useState<Jobs[]>([]);
    
    if(user && user?.role != 'recruiter'){
        console.log('inside the if clouse',{user});
        redirect('/');
    }
    useEffect(()=>{
        axios.get(`http://localhost:3005/api/jobs/${user?._id}/getAll`)
            .then((res)=>{
                setJobs(res.data.jobs);
                console.log(res.data)
            })
            .catch((err)=>{
                toast({
                    title:'Something Went Wrong',
                    description:err.response.message[0] || 'Please Try again',
                })
            });
    },[user]);
    return (
        <main className="container">
            <section className="flex justify-between items-center">
                <h1> My Jobs Posts</h1>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                        <Button variant={'fade'} size={'icon'} 
                            onClick={()=>dispatch(setOpen('createJob'))} className="rounded-full">
                            <Plus/>
                        </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                        <p>Post a job</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </section>
            <section className=" w-full min-h-[100vh - 200px]">
                <div className="flex flex-wrap">

                </div>
                {jobs.map((job)=>(
                    <JobCard job={job}/>
                ))}
            </section>
        </main>
    )
}



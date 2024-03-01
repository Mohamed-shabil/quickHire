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

export default function CreateJob() {
    const router = useRouter();
    const dispatch = useDispatch();
    const user = useSelector((state:RootState)=>state.user.userData);
    console.log({user});

    if(user?.role!= 'recruiter'){
        redirect('/');
    }

    return (
        <main className="container">
            <section className="flex justify-between items-center">
                <h1> My Jobs</h1>
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
        </main>
    )
}



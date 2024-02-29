'use client'
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation"
import { Textarea } from "@/components/ui/textarea";
import { JobCard } from "@/components/jobCard";
import { setOpen } from "@/store/slices/modalSlice";
import { useDispatch,useSelector } from "react-redux";
import { RootState } from "@/store/reducers";
import { useEffect } from "react";
import { UserType } from '@/constants/constants'

export default function CreateJob() {
    const router = useRouter();
    const dispatch = useDispatch();
    const user = useSelector((state:RootState)=>state.user.userData);
    console.log({user});

    

    return (
        <div className="w-full min-h-[calc(100vh - 50px)] flex justify-center">
            <div className="container">
                <div className="w-full flex justify-between">
                    <h1> My Jobs</h1>
                    <Button onClick={()=>dispatch(setOpen('createJob'))}>
                        Post a Job
                    </Button>
                </div>
                <div className="grid grid-cols-3">
                    
                </div>
            </div>
        </div>
    )
}


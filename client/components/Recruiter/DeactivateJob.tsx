'use client'
import axios from 'axios'
import React, { useState } from 'react'
import { Switch } from "@/components/ui/switch"
import { toast } from '@/components/ui/use-toast'
import { Check, X } from 'lucide-react'
import { Jobs } from '@/constants/constants'

export default function DeactivateJob({job}:{job:Jobs}) {
    const [isActive, setIsActive] = useState<boolean>(job.isActive);

    const onSubmit= (currentState:boolean)=>{
        setIsActive(currentState);
        axios.defaults.withCredentials = true
        axios.patch(`http://localhost:3005/api/jobs/${job._id}?isActive=${currentState}`)
            .then((res)=>{
                console.log('returned response',res.data.job)
                toast({
                    title: job.isActive ? 'Job is Activated' : 'Job is Deactivated',
                    action:(
                        <div className="h-8 w-8 bg-emerald-500 text-white grid place-items-center rounded"><Check /></div>
                    )
                })
            }).catch(err=>{
                console.log(err);
                toast({
                    title:'Something went wrong 😢',
                    description:'Please try again...',
                    action:(
                        <div className="h-8 w-8 bg-rose-500 text-white grid place-items-center rounded"><X /></div>
                    )
                })
            })
    }
    return (
        <div className='flex gap-1'>
            <div>
                <h2>{isActive ? 'Deactivate the job':'Activate the job'}</h2>
            </div>
            <Switch
                checked={isActive}
                onCheckedChange={(currentState)=>{
                    onSubmit(currentState)
                }}
            />               
        </div>
    )
}


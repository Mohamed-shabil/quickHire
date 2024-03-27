'use client'
import React from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios';
import {Application} from '@/constants/constants'
function ApplicationStatus({application}:{application:Application}) {
    const changeStatus = (value:string)=>{
        console.log(value);
        axios.patch('http://localhost:3005/api/jobs/application/change-status',{
            jobId:application.job,
            status:value
        },{
            withCredentials:true
        })
        .then((res)=>{
            console.log(res.data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    return (
        <>
            <Select defaultValue={application.status} onValueChange={changeStatus}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="submitted">Submitted</SelectItem>
                        <SelectItem value="reviewing">Reviewing</SelectItem>
                        <SelectItem value="shortlisted">Shortlisted</SelectItem>
                        <SelectItem value="accepted">Accepted</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </>
    )
}

export default ApplicationStatus
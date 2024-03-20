import React from 'react'
import { ScrollArea } from '../ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { Jobs } from '@/constants/constants'
import Image from 'next/image'
import Link from 'next/link'

const JobsCard = ({jobs}:{jobs:Jobs[]}) => {
  return (
    <>
        <ScrollArea className="w-full max-w-lg border-r p-2 h-screen">
            {jobs.map((job)=>(
                <Link href={`jobs?currentJob=${job._id}`} key={job._id}>
                    <div className="border shadow p-3 rounded-md mb-2">
                        <div className="flex flex-row space-x-2">
                            <div>
                                <Image src={job.companyImage || ''} alt={job.company} height={60} width={60}/>
                            </div>
                            <div className="flex flex-1 flex-col">
                                <h3 className="font-normal text-sm leading-3 text-slate-700-600">
                                    {job.company}
                                </h3>
                                <h2 className="font-medium text-sm py-1">{job.title}</h2>
                                <p className="font-normal text-xs">New York, USA</p>
                                <div className="flex space-x-2 mt-1">
                                    {
                                        job.skills.map((skill)=>(
                                            <Badge variant={"secondary"} className="text-blue-500 font-normal">
                                                {skill}
                                            </Badge>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </ScrollArea>
    </>
  )
}

export default JobsCard
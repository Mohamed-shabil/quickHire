import React from 'react'
import { ScrollArea } from '../ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { Jobs } from '@/constants/constants'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin as LocationIcon, Briefcase as JobTypeIcon} from 'lucide-react'

const JobsCard = ({jobs}:{jobs:Jobs[]}) => {
  return (
    <>
        <ScrollArea className="w-full max-w-lg border-r p-2 h-screen">
            {jobs.map((job)=>(
                <Link href={`jobs?currentJob=${job._id}`} key={job._id}>
                    <div className="border shadow p-4 rounded-md mb-2 px-6">
                        <div className="flex flex-row space-x-4">
                            <div className='my-auto flex shrink-0'>
                                <Image src={job.companyImage || '/photo.png'} alt={job.company} height={60} width={60}/>
                            </div>
                            <div className="flex flex-1 flex-col">
                                <h3 className="font-normal text-xs leading-3 text-slate-700-600">
                                    {job.company}
                                </h3>
                                <h2 className="font-bold text-sm py-1">{job.title}</h2>
                                <p className="font-normal text-xs flex gap-1"><LocationIcon size={'1em'}/> {job.location} • <JobTypeIcon size={'1em'}/> {job.workPlace}</p>
                                <div className="flex space-x-2 mt-1">
                                    {
                                        job.skills.map((skill,index)=>(
                                            index < 3 &&(
                                                <Badge variant={"secondary"} className="text-blue-500 font-normal">
                                                    {skill}
                                                </Badge>
                                            ) 
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
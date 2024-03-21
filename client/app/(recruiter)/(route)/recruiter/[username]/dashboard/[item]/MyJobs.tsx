import React from 'react'
import axios from 'axios'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import Image from 'next/image'
import Link from 'next/link'

import { DeleteIcon, EditIcon } from 'lucide-react'
import { Jobs } from '@/constants/constants'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardHeader } from '@/components/ui/card'


const getMyJobs = async (token:string,recruiter:string)=> {
  axios.defaults.withCredentials = true
  const res = await axios.get(`http://localhost:3005/api/jobs/${recruiter}/getAll`,{
    headers: {
      Cookie: `jwt=${token}`
    }
  })
  return res.data.jobs;
}

const JobsPage = async ({recruiter}:{recruiter:string}) => {
  const token = cookies().get('jwt')?.value;
  if(!token){
    return redirect('/signup'); 
  }
  const jobs:Jobs[] = await getMyJobs(token,recruiter);
  console.log('Hello brohhhhh.......',jobs)

  if(jobs.length === 0){
    return (
        <div className='flex items-center justify-center min-h-[calc(100vh - 100px)]'>
           You dont have any Jobs Posted
        </div>
    )
  }
  return (
    <main>
      { jobs.map((job)=>(
          <Card className="w-[500px]">
            <CardHeader className="gap-4">
                <div className="flex gap-4 flex-row">
                    <span className="w-12 h-12 flex items-center justify-center">
                    <Image src={job.companyImage || '/picture.png'} width={50} height={50} alt={"Company Image"}/>
                    </span>
                    <div className="my-auto">
                        <p className="font-semibold">{job.title}</p>
                        <small className="text-slate-400">
                            {job.company}
                        </small>
                    </div>
                    <div className="flex gap-2">
                        <Button variant={'fade'} size={'icon'}>
                            <EditIcon size={'1.2em'}/>
                        </Button>
                        <Button variant={'destructive'} size={'icon'}>
                            <DeleteIcon size={'1.2em'}/>
                        </Button>                                        
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex flex-col text-slate-400 text-sm">
                <div dangerouslySetInnerHTML={{ __html: job.jobDescription }} className="line-clamp-3" />
                <Link href={`/jobs/${job._id}`}>
                    <Button size={"sm"} variant={"link"}>
                        View More
                    </Button>
                </Link>
            </CardContent>
            <Separator />
          </Card>
          ))
      }
    </main>
  )
}
export default JobsPage
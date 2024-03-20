import React from 'react'
import axios from 'axios';
import JobsCard from '@/components/Jobs/JobsCard'

import { toast } from '@/components/ui/use-toast';
import { Jobs } from '@/constants/constants';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { JobPreview } from '@/components/Jobs/JobPreview'


const getJobs = async (token:string)=>{
  axios.defaults.withCredentials = true;
  const res = await axios.get(`http://localhost:3005/api/jobs/search-job`,{
      headers:{
          Cookie: `jwt=${token}`
      }
  });
  return res.data.jobs;
}

export default  async function page(
  {children,searchParams}:
  {
    children:React.ReactNode,
    searchParams?: { [key: string]: string | undefined }
  }) {

  const token = cookies().get('jwt')?.value;
  const currentJob = searchParams?.currentJob || ''

  if(!token){
      toast({
          title:"You are not authenticated !",
          description:"Please login to continue"
      })
      return redirect('/signup');
  }   
  const jobs:Jobs[] = await getJobs(token);

  return (
    <section className="flex w-full h-screen">
      <JobsCard jobs={jobs}/>
      <section className="w-full">
        <JobPreview jobId={currentJob} />
      </section>
  </section>
  )
}

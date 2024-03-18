import React from 'react'
import {JobCard} from '@/components/Recruiter/JobCard'
import axios from 'axios'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Jobs } from '@/constants/constants'
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
  return (
    <main>
      {
        jobs.length !=0 ?
        jobs.map((job)=>(
          <JobCard job={job}/>
        )) : 
        <div className='flex items-center justify-center min-h-[calc(100vh - 100px)]'>
           You dont have any Jobs Posted
        </div>
      }
    </main>
  )
}

export default JobsPage
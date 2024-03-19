import { Jobs } from '@/constants/constants';
import axios from 'axios'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react'

const getJob = async (token:string,jobId:string) =>{
  console.log('here is the token',token)
  axios.defaults.withCredentials = true;
  const res = await axios.get(`http://localhost:3003/api/profile/${jobId}`,{
      headers: {
          Cookie: `jwt=${token}`
      }
  });
  return res.data.profile;
}

export const page = async ({params}:{params:{jobId:string}}) => {
  const { jobId } = params;
  const token = cookies().get('jwt')?.value;
  if(!token){
    redirect('/signin')
  }

  const job:Jobs = await getJob(token,jobId);

  return (
    <div>
      <p>{job.title}</p>
    </div>
  )
}

import React from 'react'
import axios from 'axios'
import { Badge } from '@/components/ui/badge';
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';
import { Jobs } from '@/constants/constants';
import Image from 'next/image';
import DOMPurify from 'dompurify';
import { Button } from '../ui/button';

const getJob = async (token:string,jobId:string)=>{
   try {
    axios.defaults.withCredentials = true;
    const res = await axios.get(`http://localhost:3005/api/jobs/${jobId}`,{
        headers:{
            Cookie:`jwt=${token}`
        }
    })
    
    return res.data.job

   } catch (error) {
        console.error(error)
   }
}

export const  JobPreview = async ({jobId}:{jobId:string}) => {
    const token = cookies().get('jwt')?.value;

    if(!jobId){
        return <h1>Job Id is not given</h1>
    }

    if(!token){
        toast({
            title:"Awwww your are not authenticated",
            description:'Please Signup to continue'
        })
        return redirect('/signup')
    }
    
    const job:Jobs = await getJob(token,jobId);

    return (
        <main className='p-2 h-screen'>   
            <div className='h-auto w-full border-b '>
                <div className='h-full w-full flex items-start px-3 flex-col'>
                    <h1 className='font-medium text-2xl'>{job.title}</h1>
                    <span className='flex space-x-2 m-2'>
                        <Image src={job.companyImage} width={50} height={50} alt={job.company}/>
                        <span className='flex flex-col'>
                            <p>{job.company}</p>
                            <p>New York , America</p>
                        </span>
                    </span>
                    <Button>
                        Apply
                    </Button>
                </div>
            </div>
            <div className=''>
                <h1>Job Description :</h1>
                <div dangerouslySetInnerHTML={{
                    __html:job.jobDescription
                }}></div>
                <h1>Requirements:</h1>
                <div dangerouslySetInnerHTML={{
                    __html:job.requirements
                }}></div>
            </div>
        </main>
    )
}

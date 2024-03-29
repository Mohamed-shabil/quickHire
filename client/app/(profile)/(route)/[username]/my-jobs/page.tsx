'use client'
import React, { useEffect, useState } from 'react'
import {} from '@/components/Jobs/JobsCard'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/reducers'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import JobsCard from '@/components/Jobs/JobsCard'
import { Application, Jobs } from '@/constants/constants'


export default function MyJobs() {
  
  const user = useSelector((state:RootState)=> state.user.userData);
  const [ applications, setApplications ] = useState<Application[]>([]);

  useEffect(()=>{
    axios.get(`http://localhost:3005/api/jobs/applied-jobs`,{
      withCredentials:true
    }).then((res)=>{
      setApplications(res.data.applications)
      console.log(res);
    }).catch(err=>{
      console.log(err);
    })
  },[]) 
  
  const applied = applications.filter((application)=> application.status === 'applied')
  const submitted = applications.filter((application)=> application.status === "submitted")
  const reviewed = applications.filter((application)=> application.status === 'reviewed')
  const shortlisted = applications.filter((application)=> application.status === 'shortlisted');
  const rejected = applications.filter((application)=> application.status === 'shortlisted');

  console.log({submitted});
  return (
    <div className='container'>
      <div className='flex items-center justify-center'>
        <Card className='w-full max-w-[600px] p-4'>
          <h1 className='font-semibold text-xl'>
            My Jobs
          </h1>
          <div>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className='w-full flex items-center justify-between flex-wrap h-auto'>
                <TabsTrigger value="all" className='text-xs shadow-none'>All</TabsTrigger>
                <TabsTrigger value="submitted">Submitted</TabsTrigger>
                <TabsTrigger value="applied">Applied</TabsTrigger>
                <TabsTrigger value="reviewed">Reviewed</TabsTrigger>
                <TabsTrigger value="shortlisted">Shortlisted</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
              </TabsList>

              <TabsContent value="all" >
                {
                  applications.map((application)=>(
                    <JobsCard job={application.job}/>
                  ))
                }
              </TabsContent>
              <TabsContent value="submitted" >
                {
                  submitted && submitted.map((application)=>( 
                    <JobsCard job={application.job}/>
                  ))
                }
              </TabsContent>
              <TabsContent value="applied" >
                {
                  applied && applied.map((application)=>( 
                    <JobsCard job={application.job}/>
                  ))
                }
              </TabsContent>
              <TabsContent value="reviewed" >
                {
                  reviewed && reviewed.map((application)=>( 
                    <JobsCard job={application.job}/>
                  ))
                }
              </TabsContent>
              <TabsContent value="shortlisted" >
                {
                  shortlisted && shortlisted.map((application)=>( 
                    <JobsCard job={application.job}/>
                  ))
                }
              </TabsContent>
              <TabsContent value="rejected" >
                {
                  rejected && rejected.map((application)=>( 
                    <JobsCard job={application.job}/>
                  ))
                }
              </TabsContent>
              
            </Tabs>
          </div>
        </Card>
      </div>
    </div>
  )
}

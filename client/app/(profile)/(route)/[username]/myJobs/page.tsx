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
import { Jobs } from '@/constants/constants'


export default function MyJobs() {
  const [jobs,setJobs] = useState<Jobs>()
  const user = useSelector((state:RootState)=>state.user.userData);

  useEffect(()=>{
    axios.get(`http://localhost:3005/api/jobs/applied-jobs/${user?._id}`)
      .then((res)=>{
        console.log(res.data)
      })
  },[]);



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
                <TabsTrigger value="applied" >Applied</TabsTrigger>
                <TabsTrigger value="reviewed" >Reviewed</TabsTrigger>
                <TabsTrigger value="shortlisted" >Shortlisted</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
              </TabsList>

              <TabsContent value="all" >
                
              </TabsContent>
              <TabsContent value="applied">applied</TabsContent>
              <TabsContent value="reviewed">reviewed</TabsContent>
              <TabsContent value="shortlisted">shortlisted</TabsContent>
              <TabsContent value="rejected">rejected</TabsContent>
            </Tabs>
          </div>
        </Card>
      </div>
    </div>
  )
}

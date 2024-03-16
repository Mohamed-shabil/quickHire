'use client'
import React, { useState } from 'react'
import Sidebar from '@/components/Recruiter/Sidebar'
import { Page } from '@/constants/constants';
const Recruiter = () => {

  const [page , setPage] = useState<Page>('jobs');
  return (
    <main className='min-h-screen flex items-start justify-between container'>
      <Sidebar setPage={setPage}/>
      <div className='w-full h-full container'>
        <p>{page}</p>
      </div>
    </main>
  )
}

export default Recruiter
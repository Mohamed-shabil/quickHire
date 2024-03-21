import React, { useState } from 'react'
import Sidebar from '@/components/Recruiter/Sidebar'
import { Page } from '@/constants/constants';
import JobsPage from '@/app/(recruiter)/(route)/recruiter/[username]/dashboard/[item]/MyJobs'

const Recruiter = () => {

  return (
    <main className='min-h-screen flex items-start justify-between container'>
      <div className='w-full h-full container'>
        Hello Recruiter
      </div>
    </main>
  )
}

export default Recruiter
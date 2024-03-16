'use client'

import React from 'react'
import { Button } from '../ui/button'
import { Page } from '@/constants/constants'
interface SidebarProps {
    setPage: React.Dispatch<React.SetStateAction<Page>>;
  }
const Sidebar:React.FC<SidebarProps> = ({setPage}) => {
  return (
    <div className='min-w-[300px] border-r min-h-screen p-4'>
        <Button variant={'fade'} className='w-full' onClick={()=>{setPage('jobs')}}>
            Red
        </Button>
        <Button variant={'outline'} className='w-full' onClick={()=>{setPage('candidates')}}>
            Green
        </Button>
        <Button variant={'outline'} className='w-full' onClick={()=>{setPage('shortListed')}}>
            Blue
        </Button>
        <Button variant={'outline'} className='w-full' onClick={()=>{setPage('applicants')}}>
            Yello
        </Button>
    </div>
  )
}

export default Sidebar
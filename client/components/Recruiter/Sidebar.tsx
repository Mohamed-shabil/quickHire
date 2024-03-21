'use client'
import React from 'react'
import { BriefcaseIcon, Plus, UserRoundSearch } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { usePathname } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setOpen } from '@/store/slices/modalSlice';
const Sidebar = () => {
  const currentPath = usePathname();
  const basePath = currentPath.substring(0, currentPath.indexOf('items'));
  const dispatch = useDispatch();

  const options = [
    {
      title:'My Jobs',
      url:`${basePath}/my-jobs`,
      icon:<BriefcaseIcon className='w-5 h-5'/>
    },
    {
      title:'Applicants',
      url:`${basePath}/applicants`,
      icon:<UserRoundSearch className='w-5 h-5'/>
    },
  ]

  return (
    <aside className='border-r min-h-[100vh] p-4 flex flex-col space-y-4 text-center'>
        <Button variant={'outline'} 
          className='flex items-center justify-between w-full'
          onClick={()=>{
            console.log('Hello world');
            dispatch(setOpen({type:'createJob'}));
          }}>
          Post New Job <Plus />
        </Button>
        {
          options.map((option,key)=>(
            <Link href={option.url} key={key}>
                <Button variant={'outline'} className='flex items-center justify-between w-full'>
                  {option.title} {option.icon}
                </Button>
            </Link>
          ))
        }
        
    </aside>
  )
}

export default Sidebar
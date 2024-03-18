"use client"
import { Button } from '../ui/button'
import { PlusCircle } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setOpen } from '@/store/slices/modalSlice';
export function ProfileUpload() {
    const dispatch = useDispatch();
  return (
    <Button variant={'default'} size={"icon"} className="absolute right-0 bottom-0 p-0" onClick={()=>{dispatch(setOpen('ProfileAvatar'))}}>
        <PlusCircle />
    </Button>
  )
}


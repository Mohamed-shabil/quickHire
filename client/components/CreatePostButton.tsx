'use client'
import React from 'react'
import { Button } from './ui/button'
import { Dispatch } from '@reduxjs/toolkit'
import { setOpen } from '@/store/slices/modalSlice'
import { useDispatch } from 'react-redux'
import { ModalType } from '@/store/slices/modalSlice'
import { Input } from './ui/input'
import { Image } from 'lucide-react'

export default function CreatePostButton() {
    const dispatch = useDispatch();
  return (
    <div className='w-full flex items-center justify-center'>
      <div className="flex w-full max-w-lg space-x-2 p-2 border roundedd" onClick={()=>dispatch(setOpen('CreatePost'))}>
        <Input type="email" placeholder="Email" />
        <Button type="submit" variant={'default'} className='bg-blue-600'><Image /></Button>
      </div>
    </div>
  )
}


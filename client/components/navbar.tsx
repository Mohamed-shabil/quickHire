"use client"

import React, { useEffect } from "react";
import Link from "next/link";
import {useDispatch, useSelector} from 'react-redux'
import {Button} from "@/components/ui/button";
import { RootState } from "@/store/reducers";
import axios from "axios";
import { ModeToggle } from "./mode-toggle";
const Navbar = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state:RootState)=> state.user);

  // useEffect(()=>{
  //   axios.post('https://quickhire.com/api/users/currentUser')
  //     .then((res)=>{
  //       console.log(res.data);
  //     })
  // },[dispatch])

  return (
    <>
      <div className="w-full h-20 sticky top-0 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            <h1 className="font-medium">QuickHire</h1>
            <ul className="hidden md:flex gap-x-6">
              <li>
                <Link href="/about">
                  <p>About Us</p>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <p>Services</p>
                </Link>
              </li>
              <li>
                <Link href="/contacts">
                  <p>Contacts</p>
                </Link>
              </li>
            </ul>
            <div className="md:flex align-middle">
              <Button variant='ghost'>
                <Link href="/signup">
                  Signup
                </Link>
              </Button>
              <ModeToggle/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
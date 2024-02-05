"use client"

import { Button } from "@/components/ui/button";
import {Input} from "@/components/ui/input";

const VerifyOtp = () => {

    return ( 
        <div className="container flex flex-col items-center h-screen justify-center w-full pt-10">
            <div className="max-w-[350px]">
                <h2 className="font-normal text-3xl text-center mb-5">Enter your Otp</h2>
                <div className="flex justify-center align-middle mb-5">
                    <Input className="pl-5 w-[350px] tracking-[70px] flex text-center"/>
                </div>
                <Button className='w-full'>
                    Submit
                </Button>
            </div>
        </div>
    );
}
 
export default VerifyOtp;
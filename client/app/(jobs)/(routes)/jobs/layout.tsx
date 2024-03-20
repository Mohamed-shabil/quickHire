import React from "react";
import { Searchjob } from "@/components/Jobs/Searchjob";
import JobsCard from "@/components/Jobs/JobsCard";
import axios from "axios";
import {cookies} from 'next/headers'
import { redirect } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { Jobs } from "@/constants/constants";



const JobsLayout = async ({children,searchParams, params}:{children:React.ReactNode,params: any,searchParams?: { [key: string]: string | string[] | undefined }}) => {

    return (
        <main className="w-full container">
            <section
                className="w-full h-52 rounded 
                bg-gradient-to-r from-[#0052D4] via-[#4364F7] to-[#6FB1FC] 
                flex items-center justify-center"
            >
                <Searchjob />
            </section>
            {children}
        </main>
    )
}
export default JobsLayout;
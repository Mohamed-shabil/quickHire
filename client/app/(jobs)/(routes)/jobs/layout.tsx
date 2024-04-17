import React from "react";
import { Searchjob } from "@/components/Jobs/Searchjob";

const JobsLayout = async ({ children }: { children: React.ReactNode }) => {
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
    );
};
export default JobsLayout;

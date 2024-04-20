import { Ban } from "lucide-react";
import React from "react";

function Suspended() {
    return (
        <section className="h-screen w-full flex item-center justify-center ">
            <div className="flex items-center justify-center flex-col">
                <div className="max-w-md grid grid-cols-6 border p-2 rounded-md space-x-2 shadow-md">
                    <div className="flex items-center justify-center ">
                        <div className="bg-rose-500 rounded-md p-4">
                            <Ban className="text-white" />
                        </div>
                    </div>
                    <div className="col-span-5 grid place-items-center">
                        <h1 className="text-sm">
                            Your account has been suspended !
                        </h1>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Suspended;

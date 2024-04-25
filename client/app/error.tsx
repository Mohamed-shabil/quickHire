"use client";

import { Button } from "@/components/ui/button";
import { AxiosError } from "axios";
import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        if (error instanceof AxiosError) {
            console.log("Axios error");
        }
    }, [error]);

    return (
        <div className="flex items-center justify-center w-full h-full">
            <h2>{error.message}</h2>
            <Button variant={"link"} onClick={() => reset()}>
                Try again
            </Button>
        </div>
    );
}

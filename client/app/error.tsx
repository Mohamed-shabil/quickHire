"use client"; // Error components must be Client Components

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
        console.log("Erorr-------------", error);
    }, [error]);

    return (
        <div className="flex items-center justify-center">
            <h2>{error.message}</h2>
            <Button variant={"link"} onClick={() => reset()}>
                Try again
            </Button>
        </div>
    );
}

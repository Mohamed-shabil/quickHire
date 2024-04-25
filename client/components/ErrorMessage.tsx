import React, { ReactNode } from "react";

import { AlertTriangle } from "lucide-react";

import { cn } from "@/lib/utils";

export default function ErrorMessage({
    type = "error",
    message,
    className,
}: {
    message: string | undefined;
    type?: "info" | "error";
    className?: string;
}) {
    return (
        <div
            className={cn(
                "w-full flex items-center justify-center gap-2",
                className
            )}
        >
            {type == "info" ? (
                <AlertTriangle size="1.5em" className="text-yellow-500" />
            ) : (
                <AlertTriangle size="1.5em" className="text-rose-500" />
            )}
            <p className="text-sm font-semibold">
                {message || "Something went wrong"}
            </p>
        </div>
    );
}

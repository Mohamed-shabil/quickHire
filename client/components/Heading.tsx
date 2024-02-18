import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type HeadingProps = {
    children: ReactNode;
    className?: string;
    variant?: "default" | "profile-side";
};

export const Heading = ({
    children,
    className,
    variant = "default",
}: HeadingProps) => {
    switch (variant) {
        case "profile-side":
            return (
                <h3
                    className={cn(
                        "flex-shrink-0 w-80 font-bold mb-4",
                        className
                    )}>
                    {children}
                </h3>
            );
        default:
            return (
                <h3 className={cn("font-bold text-nowrap", className)}>
                    {children}
                </h3>
            );
    }
};
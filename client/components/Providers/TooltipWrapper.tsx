import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";
function TooltipWrapper({
    children,
    text,
}: {
    children: React.ReactNode;
    text: string;
}) {
    return (
        <Tooltip>
            <TooltipTrigger>{children}</TooltipTrigger>
            <TooltipContent side="left" sideOffset={5}>
                <p className="text-xs">{text}</p>
            </TooltipContent>
        </Tooltip>
    );
}

export default TooltipWrapper;

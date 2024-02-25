"use client"

import {
    Popover,
    PopoverTrigger,
    PopoverContent
} from "@/components/ui/popover"
import { Smile } from "lucide-react";
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";


interface emojiPickerProps{
    onChange:(value:string) => void;
    className:string| undefined
}

export const EmojiPicker = ({
    onChange,
    className
}:emojiPickerProps) =>{
    const {resolvedTheme} = useTheme();
    return(
        <Popover >
            <PopoverTrigger className={className}>
                <Smile/>
            </PopoverTrigger>
            <PopoverContent
                side="right"
                sideOffset={0}
                draggable
                className="bg-transparent border-none shadow-none drop-shadow-none mb-16">
                <Picker
                    theme={resolvedTheme}
                    data={data}
                    onEmojiSelect={(emoji:any)=> onChange(emoji.native)}
                />
            </PopoverContent>
        </Popover>
    )
}
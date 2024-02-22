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


interface emojiPickerProps{
    onChange:(value:string) => void;

}

export const EmojiPicker = ({
    onChange,

}:emojiPickerProps) =>{
    const {resolvedTheme} = useTheme();
    return(
        <Popover>
            <PopoverTrigger>
                <Smile/>
            </PopoverTrigger>
            <PopoverContent
                side="left"
                sideOffset={100}
                draggable
                className="bg-transparent
                border-none shadow-none drop-shadow-none 
                mb-16"
            >
                <Picker
                    theme={resolvedTheme}
                    data={data}
                    onEmojiSelect={(emoji:any)=> onChange(emoji.native)}
                />
            </PopoverContent>
        </Popover>
    )
}
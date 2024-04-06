import axios from "axios";
import { EmojiPicker } from "./emojiPicker";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";

type comment = {
    comment:string;
    createdAt: Date;
    post:string;
    user:{
        _id:string;
        name:string;
        avatar:string;
        headLine:string;
    };
}
export function Comment({comment}:{comment:comment}){
    const date = new Date(comment.createdAt)
    return(
        <div className="mb-2">
            <div className="flex flex-row gap-2">
                <Avatar className="mb-2">
                    <AvatarImage src={comment.user.avatar} alt="@shadcn" className="object-cover"/>
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="w-auto relative bg-slate-100 dark:bg-slate-900 p-2 rounded-md">
                    <h1 className="font-medium text-sm">{comment.user.name}</h1>
                    <h1 className="text-gray-500 text-xs mb-1">{comment.user.headLine}</h1>
                    <p className="text-sm font-normal text-slate-600">{comment.comment}</p>
                    <span className="text-xs text-slate-500 float-end">{date.toLocaleDateString()}</span>
                </div>
            </div>
        </div>
    )
}
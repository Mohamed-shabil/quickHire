"use client";
import { Button } from "@/components/ui/button";
import { MoreVertical, PlusCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "@/store/slices/modalSlice";
import AddSections from "./AddSections";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RootState } from "@/store/reducers";
import { useRouter } from "next/navigation";
import Link from "next/link";
export function ProfileOptions({ profile }: any) {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.userData);
    const router = useRouter();
    return (
        <>
            <AddSections />
            <Button variant="default" size={"icon"}>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <MoreVertical />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => dispatch(setOpen("createPost"))}
                        >
                            Create a post
                        </DropdownMenuItem>
                        {user?.role == "recruiter" ? (
                            <DropdownMenuItem>Post a job</DropdownMenuItem>
                        ) : (
                            <></>
                        )}
                        <Link href={`/${user?.name}/my-jobs`}>
                            <DropdownMenuItem>My Jobs</DropdownMenuItem>
                        </Link>
                    </DropdownMenuContent>
                </DropdownMenu>
            </Button>
        </>
    );
}

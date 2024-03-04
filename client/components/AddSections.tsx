'use client'
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useDispatch } from "react-redux";
import { setOpen } from "@/store/slices/modalSlice";
const AddSections = () => {
    const dispatch = useDispatch();
    return ( 
        <DropdownMenu>
            <DropdownMenuTrigger >
                <Button variant={'outline'}>
                    Setup Profile
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={()=>dispatch(setOpen('AboutFormModal'))}>Setup About</DropdownMenuItem>
                <DropdownMenuItem onClick={()=>dispatch(setOpen('LinkFormModal'))}>Add Links</DropdownMenuItem>
                <DropdownMenuItem onClick={()=>dispatch(setOpen('ExperienceFormModal'))}>Add Experience</DropdownMenuItem>
                <DropdownMenuItem onClick={()=>dispatch(setOpen('ProjectFormModal'))}>Add Projects</DropdownMenuItem>
                <DropdownMenuItem onClick={()=>dispatch(setOpen('EducationFormModal'))}>Add Education</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
 
export default AddSections;
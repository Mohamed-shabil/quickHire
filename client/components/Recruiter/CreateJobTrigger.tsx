"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { UseSelector } from "react-redux";
import { setOpen } from "@/store/slices/modalSlice";
import { useDispatch } from "react-redux";
const CreateJobTrigger = () => {
    const dispatch = useDispatch();
    return (
        <Button
            variant={"default"}
            size={"icon"}
            onClick={() => dispatch(setOpen({ type: "createJob" }))}
        >
            <Plus />
        </Button>
    );
};

export default CreateJobTrigger;

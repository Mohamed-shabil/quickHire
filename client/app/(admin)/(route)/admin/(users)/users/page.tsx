import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserList from "@/components/Admin/UsersList";
import React from "react";
import { SEEKER } from "@/types/types";
import { RECRUITER } from "@/types/types";
const page = () => {
    return (
        <>
            <TabsContent value="all">
                <UserList role="" />
            </TabsContent>
        </>
    );
};

export default page;

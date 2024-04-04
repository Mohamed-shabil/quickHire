import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserList from "@/components/Admin/UsersList";
import React from "react";
import { SEEKER } from "@/constants/constants";
import { RECRUITER } from "@/constants/constants";
const page = () => {
  return (
    <>
        <TabsContent value="all">
          <UserList role="" />
        </TabsContent>
        <TabsContent value="seeker">
          <UserList role={SEEKER} />
        </TabsContent>
        <TabsContent value="recruiter">
          <UserList role={RECRUITER} />
        </TabsContent>
    </>
  );
};

export default page;
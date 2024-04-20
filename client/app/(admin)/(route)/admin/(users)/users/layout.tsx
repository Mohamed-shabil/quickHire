import UsersList from "@/components/Admin/UsersList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RECRUITER, SEEKER } from "@/types/types";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mt-2">
            <Tabs defaultValue="all">
                <div className="flex items-center">
                    <TabsList>
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="seeker">Seekers</TabsTrigger>
                        <TabsTrigger value="recruiter">Recruiters</TabsTrigger>
                    </TabsList>
                </div>
                {children}
            </Tabs>
        </main>
    );
};

export default AdminLayout;

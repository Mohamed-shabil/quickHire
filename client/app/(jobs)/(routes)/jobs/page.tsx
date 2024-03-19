import { Searchjob } from "@/components/Jobs/Searchjob";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MapPin } from "lucide-react";
const page = () => {
  return (
    <main className="w-full container">
      <section
        className="w-full h-52 rounded 
        bg-gradient-to-r from-[#0052D4] via-[#4364F7] to-[#6FB1FC] 
        flex items-center justify-center"
      >
        <Searchjob />
      </section>
      <section className="flex w-full h-screen ">
        <ScrollArea className="w-full max-w-lg border-r p-2 h-screen">
          <div className="border shadow p-3 rounded ">
            <div className="flex flex-row space-x-2 mb-2">
              <Avatar>
                <AvatarImage src="https://github.com/vercel.png" />
                <AvatarFallback>VC</AvatarFallback>
              </Avatar>
              <div className="flex flex-1 flex-col">
                <h3 className="font-normal text-sm leading-3 text-slate-700-600">
                  Google
                </h3>
                <h2 className="font-medium text-sm py-1">Web developer</h2>
                <p className="font-normal text-xs">New York, USA</p>
                <div className="flex space-x-2 mt-1">
                  <Badge
                    variant={"secondary"}
                    className="text-blue-500 font-normal"
                  >
                    Node js
                  </Badge>
                  <Badge
                    variant={"secondary"}
                    className="text-blue-500 font-normal"
                  >
                    React js
                  </Badge>
                  <Badge
                    variant={"secondary"}
                    className="text-blue-500 font-normal"
                  >
                    Express js
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </section>
    </main>
  );
};

export default page;

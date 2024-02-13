"use client";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { AboutFormModal } from "@/components/Modals/aboutFormModal";
import { Button } from "@/components/ui/button";
import { MoreVertical, } from "lucide-react";
import { useSelector,useDispatch } from "react-redux";
import { setClose,setOpen } from "@/store/slices/modalSlice";
import { RootState } from "@/store/reducers";
import axios from "axios";
import { useEffect } from "react";
const Profile = () => {
  const dispatch = useDispatch();
  
  const type = useSelector((state:RootState)=>state.modal.type)
  axios.defaults.withCredentials = true;
  
  useEffect(()=>{
    axios.get('http://localhost:3002/api/profile/get').then(res=>{
      console.log(res);
    });

  },[])

  return (
    <div className="w-full pt-4">
      <AboutFormModal/>
      <div className="lg:container md:container w-full px-2">
        <Image src={'/coverImage.png'} width={1000} height={300} alt={"cover Image"} className="w-full rounded-t-md"/>
        <div className="flex justify-center flex-col w-full items-center -mt-10 md:-mt-12 lg:-mt-16 mb-10">
          <Image src={'/user.png'} alt={"user"} width={120} height={120} className="w-20 lg:w-32 md:w-24 rounded-full border-4 border-spacing-10 border-blue-500"/>
          <h3 className="font-medium text-2xl text-slate-500">Mohamed Shabil</h3>
          <p className="p-2 text-md text-slate-500">Backend Developer</p>
          <div className="flex gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Add Profile Sections</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={()=>dispatch(setOpen('AboutFormModal'))}>Add About Section</DropdownMenuItem>
                <DropdownMenuItem onClick={()=>dispatch(setOpen('ExpirienceFormModal'))}>Add Experience Section</DropdownMenuItem>
                <DropdownMenuItem onClick={()=>dispatch(setOpen('EducationFormModal'))}>Add Education Section</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button ><MoreVertical /></Button>
          </div>
        </div>
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="posts">Posts</TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            
          </TabsContent>
          <TabsContent value="posts">
            <h2>Posts</h2>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;

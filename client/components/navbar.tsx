"use client"
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { setUserData } from "@/store/slices/userSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import { RootState } from "@/store/reducers";
import { Button } from "./ui/button";
import { AlignRight, LogOut, UserRound } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
  
const Navbar = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    useEffect(()=>{
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:3001/api/users/currentUser').then((res)=>{
            console.log()
            dispatch(setUserData(res.data.currentUser));
        }).catch((err)=>{
            console.log('NAVBAR ERROR ',err);
        });
    },[]);
    const user = useSelector((state:RootState)=>state.user.userData);
    console.log(user)
    
    const logout = async()=>{
        await axios.get('http://localhost:3001/api/users/signout');
        router.push('/signin');
    }
    return ( 
        <header className="flex flex-wrap sm:justify-start sm:flex-nowrap w-full text-sm py-4">
            <nav className="max-w-[85rem] w-full mx-auto px-4 flex flex-wrap basis-full items-center justify-between" aria-label="Global">
                <Link className="sm:order-1 flex-none text-xl font-semibold dark:text-white" href="#">Brand</Link>
                <div className="sm:order-3 flex items-center gap-x-2">
                <button type="button" className="sm:hidden hs-collapse-toggle p-2.5 inline-flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-gray-700 dark:text-white dark:hover:bg-white/10 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-collapse="#navbar-alignment" aria-controls="navbar-alignment" aria-label="Toggle navigation">
                    <AlignRight />
                </button>
                    <span className="h-full flex items-center gap-2">
                        {user ?
                        (
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Link href={'/profile'} className="flex ">
                                    <UserRound className="mr-2 h-4 w-4"/>
                                    <span>Profile</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href={'/posts'} className="flex ">
                                    <UserRound className="mr-2 h-4 w-4"/>
                                    <span>Posts</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={logout} className="text-rose-500">
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Logout</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        
                        ) 
                        :
                        (<Link href={'/signup'}>
                            <Button variant={'secondary'} className="text-blue-500">
                                Signup
                            </Button>
                        </Link>)}
                        <ModeToggle/>
                    </span>
                </div>
                <div id="navbar-alignment" className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:grow-0 sm:basis-auto sm:block sm:order-2">
                <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:mt-0 sm:ps-5">
                    <Link className="font-medium text-blue-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="#" aria-current="page">Landing</Link>
                    <Link className="font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="#">Account</Link>
                    <Link className="font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="#">Work</Link>
                    <Link className="font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="#">Blog</Link>
                </div>
                </div>
            </nav>
        </header>
    )
}

 
export default Navbar;
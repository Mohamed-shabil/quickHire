"use client";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "@/store/slices/userSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import { RootState } from "@/store/reducers";
import { Button } from "./ui/button";
import {
  AlignRight,
  Image,
  LayoutDashboard,
  LogOut,
  UserRound,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSocket } from "./Providers/SocketProvider";

const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { connectSocket } = useSocket();

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios
      .get("http://localhost:3003/api/profile/currentUser")
      .then((res) => {
        console.log("currentUser", res.data.currentUser);
        dispatch(setUserData(res.data.currentUser));
      })
      .catch((err) => {
        console.log("NAVBAR ERROR ", err);
      });
  }, []);

  const user = useSelector((state: RootState) => state.user.userData);
  if (user?._id) {
    connectSocket(user._id);
  }
  const logout = async () => {
    await axios.get("http://localhost:3001/api/users/signout");
    router.push("/signin");
  };
  return (
    <header className="flex flex-wrap sm:justify-start sm:flex-nowrap w-full text-sm py-4">
      <nav
        className="container w-full mx-auto px-4 flex flex-wrap basis-full items-center justify-between"
        aria-label="Global"
      >
        <Link
          className="sm:order-1 flex-none text-xl font-semibold dark:text-white"
          href="/"
        >
          QuickHire
        </Link>
        <div className="sm:order-3 flex items-center gap-x-2">
          <button
            type="button"
            className="sm:hidden hs-collapse-toggle p-2.5 inline-flex justify-center 
                    items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm
                    hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent 
                    dark:border-gray-700 dark:text-white dark:hover:bg-white/10 dark:focus:outline-none 
                    dark:focus:ring-1 dark:focus:ring-gray-600"
            data-hs-collapse="#navbar-alignment"
            aria-controls="navbar-alignment"
            aria-label="Toggle navigation"
          >
            <AlignRight />
          </button>
          <span className="h-full flex items-center gap-2">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className="ring-2 ring-offset-2 ring-blue-500">
                    <AvatarImage
                      src={
                        user.avatar
                          ? user.avatar
                          : "https://github.com/shadcn.png"
                      }
                      alt="@shadcn"
                      className="object-cover"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href={`/${user.name}`} className="flex ">
                      <UserRound className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href={`/${user.name}/posts`} className="flex ">
                      <Image className="mr-2 h-4 w-4" />
                      <span>Posts</span>
                    </Link>
                  </DropdownMenuItem>
                  {user.role === "recruiter" && (
                    <DropdownMenuItem>
                      <Link
                        href={`/recruiter/${user.name}/dashboard`}
                        className="flex "
                      >
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={logout} className="text-rose-500">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href={"/signup"}>
                <Button variant={"secondary"} className="text-blue-500">
                  Signup
                </Button>
              </Link>
            )}
            <ModeToggle />
          </span>
        </div>
        <div
          id="navbar-alignment"
          className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:grow-0 sm:basis-auto sm:block sm:order-2"
        >
          <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:mt-0 sm:ps-5">
            <Link
              className="font-medium text-blue-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              aria-current="page"
              href="http://localhost:3000/"
            >
              Home
            </Link>
            <Link
              className="font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              href="http://localhost:3000/jobs"
            >
              Jobs
            </Link>
            <Link
              className="font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              href="http://localhost:3000/chats"
            >
              Messages
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

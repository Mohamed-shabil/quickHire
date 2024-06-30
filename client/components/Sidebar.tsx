"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/reducers";

import { useSocket } from "./Providers/SocketProvider";
import { redirect, useRouter } from "next/navigation";
import { axiosInstance } from "@/axios/axios";
import { TooltipProvider } from "./ui/tooltip";
import TooltipWrapper from "@/components/Providers/TooltipWrapper";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import {
    LayoutDashboard,
    UserRound,
    Image as Posts,
    LogOut,
    Home,
    User,
    Briefcase,
    BarChart3,
    MessageSquareMore,
    Gem,
} from "lucide-react";
import { Button } from "./ui/button";
import { ModeToggle } from "./Mode-toggle";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "./ui/accordion";
import { fetchSubscription } from "@/store/slices/SubscriptionSlice";
import { fetchUser } from "@/store/slices/userSlice";
import { userSignout } from "@/services/api/auth.service";
function SideBar({ children }: { children: React.ReactNode }) {
    const user = useSelector((state: RootState) => state.user.userData);

    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { connectSocket } = useSocket();

    if (user?._id) {
        connectSocket(user._id);
    }

    if (user && user.isBlocked) {
        redirect("/suspended");
    }

    useEffect(() => {
        dispatch(fetchUser());
        if (user && user.role === "recruiter") {
            dispatch(fetchSubscription());
        }
    }, []);

    useEffect(() => {
        if (user && user.role === "recruiter") {
            dispatch(fetchSubscription());
        }
    }, [user]);

    const logout = async () => {
        await userSignout();
        router.push("/signin");
    };
    const subscription = useSelector(
        (state: RootState) => state.subscription.subscription
    );
    return (
        <>
            <nav className="fixed top-0 z-50 w-full bg-background border-b">
                <div className="h-20 flex items-center gap-2 px-3 justify-between">
                    <span className="flex flex-row items-center gap-2">
                        <svg
                            className="h-8 sm:h-8 text-primary"
                            viewBox="0 0 28 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
                                fill="currentColor"
                            />
                        </svg>
                        <h3 className="font-semibold text-lg">Quick Hire</h3>
                    </span>
                    <span className="flex items-center gap-2">
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
                                    <DropdownMenuLabel>
                                        My Account
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <Link
                                            href={`/${user.name}`}
                                            className="flex "
                                        >
                                            <UserRound className="mr-2 h-4 w-4" />
                                            <span>Profile</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link
                                            href={`/${user.name}/posts`}
                                            className="flex"
                                        >
                                            <Posts className="mr-2 h-4 w-4" />
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
                                    <DropdownMenuItem
                                        onClick={logout}
                                        className="text-rose-500"
                                    >
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Logout</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Link href={"/signup"}>
                                <Button
                                    variant={"secondary"}
                                    className="text-blue-500"
                                >
                                    Signup
                                </Button>
                            </Link>
                        )}
                        <ModeToggle />
                    </span>
                </div>
            </nav>
            <TooltipProvider delayDuration={100}>
                <aside
                    className="fixed top-0 left-0 z-40 w-64 md:w-16 h-screen pt-24 transition-transform -translate-x-full border-r sm:translate-x-0"
                    aria-label="Sidebar"
                >
                    <div className="h-full px-3 pb-4">
                        <ul className="space-y-2">
                            <li>
                                <TooltipWrapper text="Home">
                                    <Link
                                        className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg hover:bg-secondary hover:shadow-sm group"
                                        href="/"
                                    >
                                        <Home
                                            size={"1.2em"}
                                            className="group-hover:text-primary"
                                        />
                                    </Link>
                                </TooltipWrapper>
                            </li>
                            <li>
                                <TooltipWrapper text="Profile">
                                    <Link
                                        className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg hover:bg-secondary hover:shadow-sm group"
                                        href={`/${user?.name}`}
                                    >
                                        <User
                                            size={"1.2em"}
                                            className="group-hover:text-primary"
                                        />
                                    </Link>
                                </TooltipWrapper>
                            </li>
                            <li>
                                <TooltipWrapper text="Posts">
                                    <Link
                                        className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg hover:bg-secondary hover:shadow-sm group"
                                        href={`/${user?.name}/posts`}
                                    >
                                        <Posts
                                            size={"1.2em"}
                                            className="group-hover:text-primary"
                                        />
                                    </Link>
                                </TooltipWrapper>
                            </li>
                            <li>
                                <TooltipWrapper text="Chats">
                                    <Link
                                        className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg hover:bg-secondary hover:shadow-sm group"
                                        href={`/chats`}
                                    >
                                        <MessageSquareMore
                                            size={"1.2em"}
                                            className="group-hover:text-primary"
                                        />
                                    </Link>
                                </TooltipWrapper>
                            </li>
                            <li>
                                <Accordion
                                    type="single"
                                    collapsible
                                    className="w-full relative border-0 hover:shadow-sm rounded-lg hover:bg-secondary overflow-visible z-100"
                                >
                                    <AccordionItem
                                        value="item-1"
                                        className="border-0"
                                    >
                                        <TooltipWrapper text="Jobs">
                                            <AccordionTrigger className="flex items-center p-2 rounded-lg group border-0 no-underline text-sm">
                                                <span className="flex items-center gap-x-3.5 flex-row pl-1">
                                                    <Briefcase
                                                        size={"1.2em"}
                                                        className="group-hover:text-primary"
                                                    />
                                                </span>
                                            </AccordionTrigger>
                                        </TooltipWrapper>
                                        <AccordionContent className="p-2 absolute w-36 z-[10] bg-slate-100 border shadow-md rounded overflow-visible">
                                            <ul className="space-y-2 text-xs px-4">
                                                <li>
                                                    <Link href="/jobs">
                                                        Job
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/jobs/my-jobs">
                                                        Applied Jobs
                                                    </Link>
                                                </li>
                                            </ul>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </li>
                            {user?.role === "recruiter" && (
                                <>
                                    <li>
                                        <TooltipWrapper text="Dashboard">
                                            <Link
                                                className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg hover:shadow-sm hover:bg-secondary group"
                                                href={`/recruiter/${user.name}/dashboard`}
                                            >
                                                <BarChart3
                                                    size={"1.2em"}
                                                    className="group-hover:text-primary"
                                                />
                                            </Link>
                                        </TooltipWrapper>
                                    </li>
                                    <li>
                                        <TooltipWrapper text="Subscription">
                                            <Link
                                                className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg hover:shadow-sm hover:bg-secondary group"
                                                href={`/subscription`}
                                            >
                                                <Gem
                                                    size={"1.2em"}
                                                    className="group-hover:text-primary"
                                                />
                                            </Link>
                                        </TooltipWrapper>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </aside>
            </TooltipProvider>
            <div className="mt-20 pt-2 sm:ml-16">{children}</div>
        </>
    );
}

export default SideBar;

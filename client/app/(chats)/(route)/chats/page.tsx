"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useSocket } from "@/components/Providers/SocketProvider";
import { useEffect, useState, Suspense } from "react";
import axios from "axios";
import Image from "next/image";
import { IChats } from "@/constants/constants";
import { useSelector } from "react-redux";
import { RootState } from "@/store/reducers";
import { redirect, useParams, useSearchParams } from "next/navigation";
import moment from "moment";
import ChatSection from "@/components/ChatSection";

interface IChatUser {
    _id: string;
    avatar: string;
    fullName: string;
    headline: string;
    name: string;
    message: IChats;
}

function Chats() {
    const { sendMessage, messages, socket } = useSocket();
    const [content, setContent] = useState("");
    const [chatUsers, setChatUsers] = useState<IChatUser[]>();
    const [user, setUser] = useState<IChatUser>();
    const [chats, setChats] = useState<IChats[]>([]);
    const [chatSend, setChatSend] = useState(false);

    const searchParams = useSearchParams();
    const chatUser = searchParams.get("user");

    const currentUser = useSelector((state: RootState) => state.user.userData);

    useEffect(() => {
        if (user) {
            axios
                .get(`http://localhost:3006/api/chats/history/${user?._id}`)
                .then((res) => {
                    console.log(res);
                    setChats(res.data.chats);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }, [user]);

    useEffect(() => {
        axios
            .get("http://localhost:3006/api/chats/getAll")
            .then((res) => {
                console.log("chatsuser -----", res.data.chats);
                setChatUsers(res.data.chats);
            })
            .catch((err) => {
                console.log(err);
            });
        console.log("Im working....");
        axios
            .get("http://localhost:3006/api/chats/searchProfile", {
                params: {
                    name: chatUser,
                },
            })
            .then((res) => {
                console.log(res.data.users);
                setChatUsers(res.data.users);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const onSearch = async (value: string) => {
        axios.defaults.withCredentials = true;
        axios
            .get("http://localhost:3006/api/chats/searchProfile", {
                params: {
                    name: value,
                },
            })
            .then((res) => {
                console.log(res.data.users);
                setChatUsers(res.data.users);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleInputChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        console.log("Handle input Change....");
        const { value } = event.target;
        await onSearch(value);
    };

    return (
        <main>
            <div className="container">
                <div className="h-full grid grid-cols-3 border rounded-lg">
                    <div className="col-span-1 h-full p-3">
                        <div>
                            <div className="w-full h-14 flex items-center border-b">
                                <h2 className="font-semibold text-2xl">
                                    Chats
                                </h2>
                            </div>
                            <div className="relative w-full h-14 flex items-center border-b">
                                <Input
                                    type="text"
                                    placeholder="search"
                                    className="pl-7"
                                    onChange={handleInputChange}
                                />
                                <Search className="w-4 h-4 absolute my-auto left-2" />
                            </div>
                            <ScrollArea className="overflow-y-auto h-[70vh]">
                                {chatUsers?.length ? (
                                    chatUsers.map((chatUser) => (
                                        <>
                                            {chatUser._id !=
                                                currentUser?._id && (
                                                <div
                                                    className=" hover:bg-slate-50 dark:hover:bg-slate-900
                                                    p-3 space-x-2 flex my-2 items-center w-full 
                                                    border h-20 rounded-md"
                                                    onClick={() => {
                                                        setUser(chatUser);
                                                    }}
                                                >
                                                    <Avatar className="h-12 w-12">
                                                        <AvatarImage
                                                            src={
                                                                chatUser.avatar
                                                            }
                                                            className=" object-cover"
                                                        />
                                                        <AvatarFallback>
                                                            CN
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex flex-col w-full">
                                                        <span className="flex justify-between w-full">
                                                            <h3 className="font-medium text-base ">
                                                                {
                                                                    chatUser.fullName
                                                                }
                                                            </h3>
                                                            {chatUser.message
                                                                ?.time ? (
                                                                <p className="text-slate-500 text-xs font-medium">
                                                                    {moment(
                                                                        chatUser
                                                                            .message
                                                                            .time
                                                                    ).format(
                                                                        "LT"
                                                                    )}
                                                                </p>
                                                            ) : (
                                                                <></>
                                                            )}
                                                        </span>
                                                        {/* <p className="line-clamp-1 font-normal text-xs">
                                                            {chats.length ? chats[chats.length-1].content : chatUser.message.content }
                                                        </p> */}
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    ))
                                ) : (
                                    <></>
                                )}
                                <ScrollBar orientation="horizontal" />
                            </ScrollArea>
                        </div>
                    </div>
                    <div className="border-l box-border p-3 col-span-2 w-full h-full relative ">
                        {user ? (
                            <ChatSection user={user} />
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full">
                                <Image
                                    src={"/empty.png"}
                                    alt=""
                                    width={150}
                                    height={150}
                                    className="opacity-60"
                                />
                                <h1 className="text-gray-500">
                                    Select a Profile to chat
                                </h1>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Chats;

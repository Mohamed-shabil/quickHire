"use client";
import { useSocket } from "@/components/Providers/SocketProvider";
import React, {
    Suspense,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import ReactPlayer from "react-player";
import { redirect, useSearchParams } from "next/navigation";
import { usePeer } from "@/components/Providers/PeerProvider";
import { Button } from "@/components/ui/button";
import { Loader, PhoneCall, PhoneOff } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Http2ServerRequest } from "http2";

const VideoCall = () => {
    const searchParams = useSearchParams();
    const userId = searchParams.get("userId") || "";
    const initiator = searchParams.get("initiator") || "";
    const {
        callAccepted,
        callEnded,
        myVideo,
        userVideo,
        stream,
        call,
        callUser,
        answerCall,
        leaveCall,
        getMedia,
        stopMedia,
    } = usePeer();

    console.log("call ended", callEnded);

    const [open, setOpen] = useState<boolean>(false);
    const [answer, setAnswer] = useState<boolean>(false);

    useEffect(() => {
        if (!!initiator) {
            setOpen(true);
        }
        if (call?.isReceivingCall && !callAccepted) {
            setAnswer(true);
        }
        getMedia();
    }, [initiator, call?.isReceivingCall, !callAccepted]);

    return (
        <div>
            <AlertDialog open={open}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your account and remove your data from our
                            servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => {
                                callUser(userId);
                                setOpen(false);
                            }}
                        >
                            Call
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog open={answer}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Somebody is calling you
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your account and remove your data from our
                            servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel
                            onClick={() => {
                                redirect("/");
                            }}
                        >
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => {
                                setAnswer(false);
                                answerCall();
                            }}
                        >
                            Answer
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {call?.isReceivingCall && !callAccepted && (
                <>
                    <h2>Somebody is calling </h2>
                    <Button onClick={answerCall}>Answer</Button>
                </>
            )}

            <div className="w-full h-[90vh] relative">
                {userVideo ? (
                    <video
                        className="w-full h-full object-cover flex items-end justify-center"
                        ref={userVideo}
                        autoPlay
                        muted
                    ></video>
                ) : (
                    <div className="w-full h-full bg-black">
                        <Loader className="animate-spin" />
                    </div>
                )}
                {callAccepted && !callEnded ? (
                    <div className="absolute bottom-0 w-full h-20 flex items-center justify-center">
                        <Button
                            className="bg-rose-500 
                    rounded-full absolute bottom-6 hover:bg-rose-700"
                            onClick={leaveCall}
                        >
                            <PhoneOff />
                        </Button>
                    </div>
                ) : (
                    <div className="absolute bottom-0 w-full h-24 flex items-center justify-center">
                        <Button
                            className="bg-emerald-500 rounded-full absolute bottom-6 hover:bg-emerald-700 h-16 w-16"
                            onClick={() => callUser(userId)}
                            size={"icon"}
                        >
                            <PhoneCall />
                        </Button>
                    </div>
                )}
                <video
                    ref={myVideo}
                    autoPlay
                    muted
                    className="w-64 h-44 absolute top-3 left-2 object-fill rounded-md"
                />
            </div>
        </div>
    );
};

export default VideoCall;

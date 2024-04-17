"use client";

import React, {
    Ref,
    RefObject,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { Instance } from "simple-peer";
import Peer from "simple-peer";
import { useSocket } from "./SocketProvider";
import { redirect, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/reducers";
import { toast } from "../ui/use-toast";
import { Button } from "../ui/button";
import Link from "next/link";

interface Call {
    isReceivingCall: boolean;
    from: string;
    name: string;
    signal: any;
}
interface PeerProviderProps {
    children?: React.ReactNode;
}

interface IPeerContext {
    callUser: (id: string) => void;
    leaveCall: () => void;
    answerCall: () => void;
    callAccepted: boolean;
    stream: MediaStream | undefined;
    call: Call | undefined;
    callEnded: boolean;
    myVideo: RefObject<HTMLVideoElement>;
    userVideo: RefObject<HTMLVideoElement>;
    getMedia: () => void;
    stopMedia: () => void;
}

export const usePeer = () => {
    const state = useContext(PeerContext);

    if (!state) {
        throw new Error("State is undefined");
    }
    return state;
};

const PeerContext = React.createContext<IPeerContext | null>(null);

export const PeerProvider: React.FC<PeerProviderProps> = ({ children }) => {
    const [callAccepted, setCallAccepted] = useState<boolean>(false);
    const [callEnded, setCallEnded] = useState<boolean>(false);
    const [stream, setStream] = useState<MediaStream>();
    const [call, setCall] = useState<Call>();
    const router = useRouter();
    const { socket } = useSocket();

    const myVideo = useRef<HTMLVideoElement>(null);
    const userVideo = useRef<HTMLVideoElement>(null);
    const connectionRef = useRef<Instance>();

    const currentUser = useSelector((state: RootState) => state.user.userData);

    useEffect(() => {
        socket?.on("calluser", ({ from, name: callerName, signal }) => {
            console.log("calling user....");
            setCall({ isReceivingCall: true, from, name: callerName, signal });
        });
    }, [socket]);

    const getMedia = () => {
        console.log("Media is working -----");
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((currentStream) => {
                console.log("media is working ");
                setStream(currentStream);
                // @ts-ignore
                myVideo.current.srcObject = currentStream;
            });
    };

    const stopMedia = () => {
        if (stream) {
            stream.getTracks().forEach((track) => {
                track.stop();
            });
            // @ts-ignore
            myVideo.current.srcObject = null;

            setStream(undefined);
        }
    };

    const answerCall: IPeerContext["answerCall"] = () => {
        setCallAccepted(true);
        console.log("answering call");
        const peer = new Peer({ initiator: false, trickle: false, stream });

        peer.on("signal", (data) => {
            console.log("answering call", data);
            if (call) {
                socket?.emit("answercall", { signal: data, to: call.from });
            }
        });

        peer.on("stream", (currentStream) => {
            if (userVideo.current) {
                userVideo.current.srcObject = currentStream;
            }
        });

        if (call) {
            peer.signal(call.signal);
        }

        connectionRef.current = peer;

        redirect("chats/videoCall");
    };

    const callUser: IPeerContext["callUser"] = (id: string) => {
        const peer = new Peer({ initiator: true, trickle: false, stream });

        peer.on("signal", (data) => {
            console.log("EMIting CallUser");
            console.log(id);
            socket?.emit("calluser", {
                userToCall: id,
                signalData: data,
                from: currentUser?._id,
                name: currentUser?.name,
                avatar: currentUser?.avatar || "",
            });
        });

        peer.on("stream", (currentStream) => {
            console.log("Streaming");
            if (userVideo.current) {
                console.log("Streaming Video ");
                userVideo.current.srcObject = currentStream;
            }
        });

        socket?.on("callaccepted", (signal) => {
            console.log("callaccepted");
            setCallAccepted(true);
            peer.signal(signal);
        });

        connectionRef.current = peer;
    };

    const leaveCall: IPeerContext["leaveCall"] = () => {
        setCallEnded(true);

        if (connectionRef.current) {
            connectionRef.current.destroy();
        }
        stopMedia();
        router.refresh();
        router.push("/chats");
    };

    {
        call?.isReceivingCall &&
            !callEnded &&
            toast({
                title: `${call.name} is calling you`,
                action: <Link href={"/chats/videoCall"}>Answer</Link>,
            });
    }
    return (
        <PeerContext.Provider
            value={{
                getMedia,
                stopMedia,
                leaveCall,
                callUser,
                answerCall,
                callAccepted,
                call,
                stream,
                callEnded,
                myVideo,
                userVideo,
            }}
        >
            {children}
        </PeerContext.Provider>
    );
};

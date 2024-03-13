'use client'
import { useSocket } from '@/components/Providers/SocketProvider';
import React, { useCallback, useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import {PeerService} from '@/services/peer';


const VideoCall = ({params}:{params:{room:string}}) => {
    const peer = new PeerService();

    const {room} = params;
    const { socket,remoteSocketId } = useSocket();
    const [myStream, setMyStream] = useState<MediaStream>();
    const [remoteStream, setRemoteStream] = useState();

  
    const handleCallUser = useCallback(async() => {
       try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });
        console.log('stream is here...',stream);
        setMyStream(stream);

        const offer = await peer.getOffer();
        console.log('Calling the user :',offer);
        socket?.emit("user:call", { to: remoteSocketId, offer });
        console.log(stream);
       } catch (error) {
        console.log('new Error',error)
       }
    }, [ socket]);

    const handleIncommingCall = useCallback(
      async ({ from, offer }:{from:string,offer:RTCSessionDescription}) => {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });
        setMyStream(stream);
        console.log(`Incoming Call`, from, offer);
        const ans = await peer.getAnswer(offer);
        console.log('HandleIncomingcall Ans',ans);
        if(socket?.emit){
          socket?.emit("call:accepted", { to: from, ans })
        }
      },
      [socket]
    );

    const sendStreams = useCallback(() => {
      if(myStream && peer){
        for (const track of myStream.getTracks()) {
          peer?.peer?.addTrack(track, myStream);
        }
      }
    }, [myStream]);

    const handleCallAccepted = useCallback(async ({ from, ans }:{from:string,ans:RTCSessionDescriptionInit}) => {
        if (peer) {
          await peer.setLocalDescription(new RTCSessionDescription(ans));
          console.log("Remote description set successfully.");
          sendStreams();
        }
      },
      [sendStreams]
    );
  

    useEffect(()=>{
      handleCallUser();
      socket?.on('incoming:call',handleIncommingCall)
      socket?.on("call:accepted", handleCallAccepted);
    },[])

  


  
  return (
    <div>
        <h1 className='text-2xl'>ROOM PAGE</h1>
        <h4>{remoteSocketId ? "Connected" : "No one in room"}</h4>
        {myStream && (
        <>
          <h1>My Stream</h1>
          <ReactPlayer
            playing
            muted
            height="300px"
            width="300px"
            url={myStream}
          />
        </>
      )}

    </div>
  )
}

export default VideoCall
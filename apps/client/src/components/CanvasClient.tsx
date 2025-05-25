"use client"

import { initDraw } from "@/draw";
import { useSocket } from "@/hooks/useSocket";
import { useRouter } from "next/navigation";
// we can use p5.js library rather than building it from scratch

import { useEffect, useRef, useState } from "react";

export default function CanvasClient({roomId, shapes}: {roomId: number, shapes: string}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    console.log(shapes);
    const router = useRouter();

    const [currShape, setCurrShape] = useState("");

    const {socket, loading} = useSocket();

    useEffect(() => {
        if(socket && !loading){
            socket.send(JSON.stringify({
                type: "join_room",
                roomId: roomId
            }))
        }
    }, [socket, loading, roomId])

    useEffect(() => {

        if(canvasRef.current){
            const canvas = canvasRef.current;
            // match the width and height of the window to canvas so that we can use tailwind classes
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            initDraw(canvas, socket as WebSocket, currShape)
        }

    }, [canvasRef, socket, currShape])

    if(!socket || loading){
        return <div>Connecting to server....</div>
    }
    console.log("Shape: ", currShape)

    return <>
    <div className='absolute left-10 top-2 flex gap-2'>
        <div onClick={() => setCurrShape("rect")}
         className={` text-black p-2 rounded-md hover:cursor-pointer
         ${currShape == "rect" ? "bg-gray-500": "bg-gray-700"}`}>Rectangle</div>
        <div onClick={() => setCurrShape("circle")}
         className={` text-black p-2 rounded-md hover:cursor-pointer
         ${currShape == "circle" ? "bg-gray-500": "bg-gray-700"}`}>Circle</div>
    </div>
    <div onClick={() => {
        router.push('/lobby')
    }}
     className='p-2 absolute left-[90%] top-2 rounded-md hover:cursor-pointer bg-red-500 text-black hover:bg-red-400'>
        Leave Room
    </div>
    <canvas ref={canvasRef} className="w-screen h-screen"></canvas>
    
    </>
}
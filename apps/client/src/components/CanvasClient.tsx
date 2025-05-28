"use client"

import { initDraw } from "@/draw";
import { useRouter } from "next/navigation";
// we can use p5.js library rather than building it from scratch

import { useEffect, useRef, useState } from "react";
import { Toolbar } from "./ToolBar";

export default function CanvasClient({socket, loading, id}:
     {socket: WebSocket | undefined, loading: boolean, id: number}) {
    
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const router = useRouter();

    const [currShape, setCurrShape] = useState("");
    const hasJoinedRoom = useRef(false);

    // join room effect, runs once socket is ready
    useEffect(() => {
        if(socket && !loading && id && !hasJoinedRoom.current){
            socket.send(JSON.stringify({
                type: "join_room",
                roomId: id
            }));
            hasJoinedRoom.current = true;
            console.log("Joined Room: ", id)
        }
    }, [socket, loading, id])

    // canvas initialization effect, runs once canvas and socket is ready
    useEffect(() => {

        if(canvasRef.current && socket && !loading){
            const canvas = canvasRef.current;
            // match the width and height of the window to canvas so that we can use tailwind classes
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            
            let cleanup: (() => void) | undefined;
            // initialize drawing with cleanup function 
            const initializeCanvas = async () => {
                cleanup = await initDraw(canvas, socket, id, currShape);
                console.log("Canvas initialized for room:", id);
            };

            initializeCanvas();

            // Return cleanup function to remove event listeners
            return () => {
                if (cleanup) {
                    cleanup();
                }
            };
        }

    }, [canvasRef, socket, loading, id, currShape])

    // Show loading state while connecting
    if(!socket || loading){
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-white text-xl">Connecting to server...</div>
            </div>
        );
    }

    return <>
    {/* Render toolbar on top of the canvas  */}
    <Toolbar currShape={currShape} setCurrShape={setCurrShape} />
    
    {/* Leave room button to exit the room, user goes to the lobby */}
    <div onClick={() => {
        router.push('/lobby')
    }}
     className='p-2 absolute left-[90%] top-4 rounded-md hover:cursor-pointer bg-red-500 text-black hover:bg-red-400'>
        Leave Room
    </div>

    {/* This is the actual canvas element */}
    <canvas ref={canvasRef} className="w-screen h-screen"></canvas>
    
    </>
}
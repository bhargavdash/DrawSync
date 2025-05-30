// "use client"

// import { useRouter } from "next/navigation";
// import { Game, Tool } from "@/draw/Game";
// // we can use p5.js library rather than building it from scratch

// import { useEffect, useRef, useState } from "react";
// import { Toolbar } from "./ToolBar";

// export default function CanvasClient({socket, loading, id}:
//      {socket: WebSocket | undefined, loading: boolean, id: number}) {
    
//     const canvasRef = useRef<HTMLCanvasElement>(null);
//     const gameRef = useRef<Game | null>(null);
//     const router = useRouter();

//     const [currTool, setCurrTool] = useState<Tool>("rect");
//     const hasJoinedRoom = useRef(false);

//     // join room effect, runs once socket is ready
//     useEffect(() => {
//         if(socket && !loading && id && !hasJoinedRoom.current){
//             socket.send(JSON.stringify({
//                 type: "join_room",
//                 roomId: id
//             }));
//             hasJoinedRoom.current = true;
//             console.log("Joined Room: ", id)
//         }
//     }, [socket, loading, id])

//     // canvas initialization effect, runs once canvas and socket is ready
//     useEffect(() => {

//         if(canvasRef.current && socket && !loading){
//             const canvas = canvasRef.current;
//             // match the width and height of the window to canvas so that we can use tailwind classes
//             canvas.width = window.innerWidth;
//             canvas.height = window.innerHeight;
            
//             // initialize drawing with cleanup function 
//             const initializeCanvas = async () => {
//                 try{
//                     const game = new Game(canvas, socket, id);
//                     await game.initialize(currTool);
//                     gameRef.current = game;
//                     console.log("Game initialized for room ", id);
//                 } catch(err){
//                     console.error("Failed to initialize game:", err);
//                 }
//             };

//             initializeCanvas();

//             // Return cleanup function to remove event listeners
//             return () => {
//                 if (gameRef.current) {
//                     gameRef.current.cleanup();
//                     gameRef.current = null;
//                 }
//             };
//         }

//     }, [canvasRef, socket, loading, id])

//     // handle tool changes
//     useEffect(() => {
//         if(gameRef.current){
//             gameRef.current.setTool(currTool);
//         }
//     }, [currTool]);

//     // Show loading state while connecting
//     if(!socket || loading){
//         return (
//             <div className="flex items-center justify-center h-screen">
//                 <div className="text-white text-xl">Connecting to server...</div>
//             </div>
//         );
//     }

//     return <>
//     {/* Render toolbar on top of the canvas  */}
//     <Toolbar currTool={currTool} setCurrTool={setCurrTool} />
    
//     {/* Leave room button to exit the room, user goes to the lobby */}
//     <div onClick={() => {
//         router.push('/lobby')
//     }}
//      className='p-2 absolute left-[90%] top-4 rounded-md hover:cursor-pointer bg-red-500 text-black hover:bg-red-400'>
//         Leave Room
//     </div>

//     {/* This is the actual canvas element */}
//     <canvas ref={canvasRef} className="w-screen h-screen"></canvas>
    
//     </>
// }


"use client"

import { Game, Tool } from "@/draw/Game"; // Updated import
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { EnhancedToolbar } from "./ToolBar";// Updated import

export default function CanvasClient({socket, loading, id}: {
    socket: WebSocket | undefined, 
    loading: boolean, 
    id: number
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const gameRef = useRef<Game | null>(null); // Store game instance
    const router = useRouter();

    const [currShape, setCurrShape] = useState<Tool>("rect");
    const [currColor, setCurrColor] = useState<string>("#ffffff");
    const hasJoinedRoom = useRef(false);

    // Join room effect, runs once socket is ready
    useEffect(() => {
        if(socket && !loading && id && !hasJoinedRoom.current){
            socket.send(JSON.stringify({
                type: "join_room",
                roomId: id
            }));
            hasJoinedRoom.current = true;
            console.log("Joined Room: ", id);
        }
    }, [socket, loading, id])

    // Canvas initialization effect
    useEffect(() => {
        if(canvasRef.current && socket && !loading){
            const canvas = canvasRef.current;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            
            const initializeGame = async () => {
                try {
                    const game = new Game(canvas, socket, id);
                    await game.initialize(currShape);
                    game.setColor(currColor); // Set initial color
                    gameRef.current = game;
                    console.log("Game initialized for room:", id);
                } catch (error) {
                    console.error("Failed to initialize game:", error);
                }
            };

            initializeGame();

            // Handle window resize
            const handleResize = () => {
                if (canvasRef.current) {
                    canvasRef.current.width = window.innerWidth;
                    canvasRef.current.height = window.innerHeight;
                    gameRef.current?.render?.(); // Re-render if method exists
                }
            };

            window.addEventListener('resize', handleResize);

            // Cleanup function
            return () => {
                window.removeEventListener('resize', handleResize);
                if (gameRef.current) {
                    gameRef.current.cleanup();
                    gameRef.current = null;
                }
            };
        }
    }, [canvasRef, socket, loading, id]);

    // Handle tool changes
    useEffect(() => {
        if (gameRef.current) {
            gameRef.current.setTool(currShape);
        }
    }, [currShape]);

    // Handle color changes
    useEffect(() => {
        if (gameRef.current) {
            gameRef.current.setColor(currColor);
        }
    }, [currColor]);

    // Show loading state while connecting
    if(!socket || loading){
        return (
            <div className="flex items-center justify-center h-screen bg-gray-900">
                <div className="text-white text-xl">Connecting to server...</div>
            </div>
        );
    }

    return (
        <div className="relative w-screen h-screen bg-gray-900 overflow-hidden">
            {/* Enhanced Toolbar */}
            <EnhancedToolbar 
                currShape={currShape} 
                setCurrShape={setCurrShape}
                currColor={currColor}
                setCurrColor={setCurrColor}
                gameRef={gameRef}
            />
            
            {/* Leave room button */}
            <div 
                onClick={() => router.push('/lobby')}
                className='p-2 absolute right-4 top-4 rounded-md hover:cursor-pointer bg-red-500 text-white hover:bg-red-400 transition-colors z-10'
            >
                Leave Room
            </div>

            {/* Room info */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg text-sm z-10">
                Room ID: {id}
            </div>

            {/* Canvas element */}
            <canvas 
                ref={canvasRef} 
                className="w-screen h-screen cursor-crosshair"
                style={{ 
                    cursor: currShape === 'select' ? 'default' : 'crosshair'
                }}
            />

            {/* Instructions overlay for first-time users */}
            <div className="absolute bottom-4 right-4 bg-gray-800 text-white p-3 rounded-lg text-xs max-w-xs opacity-75 z-10">
                <div className="font-semibold mb-1">Quick Tips:</div>
                <div>• Use tools from toolbar to draw</div>
                <div>• Select tool to click and modify shapes</div>
                <div>• Scroll to zoom, Ctrl+click to pan</div>
                <div>• Use keyboard shortcuts for faster workflow</div>
            </div>
        </div>
    );
}
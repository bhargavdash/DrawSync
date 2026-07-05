"use client"

import { Game, Tool } from "@/draw/Game"; // Updated import
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { EnhancedToolbar } from "./ToolBar";// Updated import
import { LoadingSpinner } from "./loading-spinner";
import { LogOut } from "lucide-react";

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
            <div className="flex flex-col items-center justify-center gap-4 h-screen bg-(--color-bg)">
                <LoadingSpinner size="lg" />
                <p className="text-(--color-ink) text-sm font-medium">Connecting to server...</p>
            </div>
        );
    }

    return (
        <div className="relative w-screen h-screen bg-(--color-bg) blueprint-grid overflow-hidden">
            {/* Enhanced Toolbar */}
            <EnhancedToolbar
                currShape={currShape}
                setCurrShape={setCurrShape}
                currColor={currColor}
                setCurrColor={setCurrColor}
                gameRef={gameRef}
            />

            {/* Leave room button */}
            <button
                onClick={() => router.push('/lobby')}
                className="flex items-center gap-1.5 p-2 absolute right-4 top-4 rounded-md bg-(--color-surface-recessed) border border-(--color-line) text-(--color-ink) text-sm hover:bg-(--color-surface) transition-colors z-10"
            >
                <LogOut size={14} />
                Leave room
            </button>

            {/* Room info — hidden below sm, where the toolbar already occupies this space */}
            <div className="hidden sm:block absolute top-4 left-1/2 -translate-x-1/2 bg-(--color-surface-recessed) border border-(--color-line) text-(--color-ink) px-3 py-1.5 rounded-md font-(family-name:--font-mono-readout) text-xs z-10">
                room · {id}
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
            <div className="absolute bottom-4 right-4 bg-(--color-surface-recessed) border border-(--color-line) text-(--color-ink-muted) p-3 rounded-lg text-xs max-w-xs z-10">
                <div className="font-medium text-(--color-ink) mb-1">Quick tips</div>
                <div>Pick a tool from the toolbar to draw</div>
                <div>Select tool to click and modify shapes</div>
                <div>Scroll to zoom, Ctrl+click to pan</div>
            </div>
        </div>
    );
}
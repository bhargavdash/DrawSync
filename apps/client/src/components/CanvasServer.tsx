// connect to the ws server from here and pass the ws object to the next component 
"use client"

import { useSocket } from "@/hooks/useSocket";
import CanvasClient from "./CanvasClient";

export default function CanvasServer({id}: {id: number}){
    const {socket, loading} = useSocket();

    return <CanvasClient socket={socket} loading={loading} id={id} />
}
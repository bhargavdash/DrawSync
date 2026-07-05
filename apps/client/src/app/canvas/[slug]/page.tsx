// this is the starting point of the canvas logic, here the roomId is extracted from the slug
// and CanvasServer is called which establishes connection with the ws-backend

import { HTTP_URL } from "@/app/config";
import CanvasServer from "@/components/CanvasServer";
import axios from "axios";
import Link from "next/link";

async function getRoomId(slug: string){
    const response = await axios.get(`${HTTP_URL}/room/${slug}`)

    return response.data.id;
}

export default async function Canvas({params} : {params: Promise<{slug: string}>}) {
    // Await the params Promise to get the actual params object
    const {slug} = await params;
    try{
        const roomId = await getRoomId(slug);
        if(!roomId){
            return null;
        }
    
        return <CanvasServer id={roomId} />
    } catch (error) {
        console.error("Error fetching room ID:", error);
        return (
            <div className="flex flex-col items-center justify-center gap-4 h-screen bg-(--color-bg) text-center px-6">
                <p className="text-(--color-ink) text-lg">This room doesn&apos;t exist yet.</p>
                <Link
                    href="/lobby"
                    className="px-6 py-2.5 rounded-md bg-(--color-accent) text-(--color-bg) text-sm font-medium hover:brightness-110 transition-[filter]"
                >
                    Create it
                </Link>
            </div>
        )
    }
}
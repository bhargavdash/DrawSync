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

export default async function Canvas({params} : {params: {slug: string}}) {
    const slug = (await params).slug;

    try{
        const roomId = await getRoomId(slug);
        if(!roomId){
            return;
        }
    
        return <CanvasServer id={roomId} />
    } catch (error) {
        console.error("Error fetching room ID:", error);
        return (
            <div className="flex items-center justify-center gap-2 h-screen bg-gray-900">
                <div className="text-white text-xl">This room does not exist, please create this room first...</div>
                <Link href="/lobby" 
                className="flex items-center px-6 py-3 bg-fuchsia-600 hover:bg-fuchsia-700 
                         rounded-lg transition-all duration-200 gap-2 flex-1 sm:flex-initial
                         justify-center shadow-lg shadow-fuchsia-800/20
                         hover:shadow-fuchsia-700/40">
                    Create Room</Link>
            </div>
        )
    }
    
}
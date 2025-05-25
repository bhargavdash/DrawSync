// this is the starting point of the canvas logic, here the roomId is extracted from the slug
// and CanvasServer is called which establishes connection with the ws-backend


import { HTTP_URL } from "@/app/config";
import CanvasServer from "@/components/CanvasServer";
import axios from "axios";

async function getRoomId(slug: string){
    const response = await axios.get(`${HTTP_URL}/room/${slug}`)

    return response.data.id;
}

export default async function Canvas({params} : {params: {slug: string}}) {
    const slug = (await params).slug;

    const roomId = await getRoomId(slug);
    
    if(!roomId){
        return;
    }

    return <CanvasServer id={roomId} />
}
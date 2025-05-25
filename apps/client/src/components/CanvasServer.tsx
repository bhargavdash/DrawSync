// here get the chats/shapes from the backend and pass them to the client function which connects the 
// ws-server

import { HTTP_URL } from "@/app/config";
import CanvasClient from "./CanvasClient";
import axios from "axios";

async function getShapes(roomId: number) {
    const response = await axios.get(`${HTTP_URL}/chats/${roomId}`);

    return response.data.chats;
}

export default async function CanvasServer({id}: {id: number}){
    const shapes = await getShapes(id);

    return <CanvasClient roomId={id} shapes={shapes} />
}
import axios from "axios";
import { HTTP_URL } from "@/app/config";

export type Shape =
  | {
      type: "rect";
      startX: number;
      startY: number;
      width: number;
      height: number;
    }
  | {
      type: "circle";
      centerX: number;
      centerY: number;
      radius: number;
    };

export async function initDraw(
  canvas: HTMLCanvasElement,
  socket: WebSocket,
  roomId: number,
  currShape: string
) {
  const ctx = canvas.getContext("2d");
  // return empty cleanup if no ctx
  if (!ctx) return () => {};

  const existingShapes: Shape[] = await getExistingShapes(roomId);
  console.log("Prev shapes here:");
  console.log(existingShapes);
  console.log("Current shape is: ", currShape);

  clearCanvas(ctx, canvas, existingShapes);

  let clicked = false;
  let startX = 0;
  let startY = 0;

  // define handlers as named functions so that they can be removed
  const mouseDownHandler = (e: MouseEvent) => {
    clicked = true;
    startX = e.clientX;
    startY = e.clientY;
  };

  const mouseUpHandler = (e: MouseEvent) => {
    clicked = false;
    const width = e.clientX - startX;
    const height = e.clientY - startY;

    if(currShape === "rect"){
        const msgObject: Shape = {
        type: "rect",
        startX,
        startY,
        width,
        height,
        };

        existingShapes.push(msgObject);
        socket.send(
        JSON.stringify({
            type: "chat",
            message: JSON.stringify(msgObject),
            roomId,
        })
        );
    }
    else if(currShape === "circle"){
        const msgObject: Shape = {
            type: "circle",
            centerX: (e.clientX + startX)/2,
            centerY: (e.clientY + startY)/2,
            radius: Math.sqrt((e.clientX - startX)*(e.clientX - startX) + (e.clientY - startY)*(e.clientY - startY)) / 2
        }
        existingShapes.push(msgObject);
        socket.send(
            JSON.stringify({
                type: "chat",
                message: JSON.stringify(msgObject),
                roomId
            })
        );
    }
  };

  const mouseMoveHandler = (e: MouseEvent) => {
    if (clicked) {
        if(currShape === "rect"){
            const width = e.clientX - startX;
            const height = e.clientY - startY;
            clearCanvas(ctx, canvas, existingShapes);
            ctx.strokeStyle = "white";
            ctx.strokeRect(startX, startY, width, height);
        }
        else if(currShape === "circle"){
            const centerX = (e.clientX + startX)/2;
            const centerY = (e.clientY + startY)/2;
            
            // Use Euclidean distance to find radius
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            const radius = Math.sqrt(dx * dx + dy * dy) / 2;

            clearCanvas(ctx, canvas, existingShapes);
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, 2*Math.PI);
            ctx.strokeStyle = "white";
            ctx.stroke();
        }
    }
  };

  canvas.addEventListener("mousedown", mouseDownHandler);
  canvas.addEventListener("mouseup", mouseUpHandler);
  canvas.addEventListener("mousemove", mouseMoveHandler);

  const messageHandler = (event: MessageEvent) => {
    const parsedData = JSON.parse(event.data);

    if (parsedData.type === "chat") {
      try {
        const newShape = JSON.parse(parsedData.message);
        existingShapes.push(newShape);
        console.log("New shape appended");
        console.log(existingShapes);
        clearCanvas(ctx, canvas, existingShapes);
      } catch (e) {
        console.error("Error parsing received shape: ", e);
      }
    } else {
      console.log("Message not parsed");
    }
  };

  socket.addEventListener("message", messageHandler);

  return () => {
    canvas.removeEventListener("mousedown", mouseDownHandler);
    canvas.removeEventListener("mouseup", mouseUpHandler);
    canvas.removeEventListener("mousemove", mouseMoveHandler);
    socket.removeEventListener("message", messageHandler);
    console.log("Canvas event listeners cleaned up");
  };
}


// function to re-render canvas 
function clearCanvas(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  existingShapes: Shape[]
) {
  if (!ctx) return;
  console.log("Clear canvas called");

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  existingShapes.map((shape) => {
    if (shape.type === "rect") {
      ctx.strokeStyle = "white";
      ctx.strokeRect(shape.startX, shape.startY, shape.width, shape.height);
    }
    else if(shape.type === "circle"){
        ctx.beginPath();
        ctx.arc(shape.centerX, shape.centerY, shape.radius, 0, 2*Math.PI);
        ctx.strokeStyle = "white";
        ctx.stroke();
    }
  });
}

// function to get prev shapes from backend
async function getExistingShapes(roomId: number) {
  const response = await axios.get(`${HTTP_URL}/chats/${roomId}`);
  const chats = response.data.chats;

  const shapes = chats.map((x: { message: string }) => {
    const messageData = JSON.parse(x.message);
    return messageData;
  });

  return shapes;
}

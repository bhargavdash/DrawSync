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
  roomId: number
) {
  const ctx = canvas.getContext("2d");
  // return empty cleanup if no ctx
  if (!ctx) return () => {};

  const existingShapes: Shape[] = await getExistingShapes(roomId);
  console.log("Prev shapes here:");
  console.log(existingShapes);

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
  };

  const mouseMoveHandler = (e: MouseEvent) => {
    if (clicked) {
      const width = e.clientX - startX;
      const height = e.clientY - startY;
      clearCanvas(ctx, canvas, existingShapes);
      ctx.strokeStyle = "white";
      ctx.strokeRect(startX, startY, width, height);
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
  });
}

async function getExistingShapes(roomId: number) {
  const response = await axios.get(`${HTTP_URL}/chats/${roomId}`);
  const chats = response.data.chats;

  const shapes = chats.map((x: { message: string }) => {
    const messageData = JSON.parse(x.message);
    return messageData;
  });

  return shapes;
}

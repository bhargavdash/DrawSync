import { existingShapes } from "./shapes";

export function initDraw(canvas: HTMLCanvasElement, socket: WebSocket, currShape: string) {
    const ctx = canvas.getContext("2d");
    if(!ctx) return;
    console.log(currShape)

    clearCanvas()

    socket.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);

        if(parsedData.type === "chat"){
            console.log(parsedData.message);
        }
    }

    let clicked = false;
    let startX = 0;
    let startY = 0;

    canvas.addEventListener("mousedown", (e) => {
        clicked = true;
        startX  = e.clientX;
        startY = e.clientY;
    })
    canvas.addEventListener("mouseup", (e) => {
        clicked = false;
        const width = e.clientX - startX;
        const height = e.clientY - startY;
        if(currShape === "circle"){
            return;
        }
        else if(currShape === "rect"){
            existingShapes.push({
            type: "rect",
            startX,
            startY,
            width,
            height
        })
        }
        
    })
    canvas.addEventListener("mousemove", (e) => {
        if(clicked){
            if(currShape === "circle"){
                return;
            }
            else if(currShape === "rect"){
                const width = e.clientX - startX;
                const height = e.clientY - startY;
                clearCanvas()
                ctx.strokeStyle = "white";
                ctx.strokeRect(startX, startY, width, height);
            }
        }
    })

    function clearCanvas() {
        if(!ctx) return;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        existingShapes.map((shape) => {
            if(shape.type === "rect"){
                ctx.strokeStyle = "white";
                ctx.strokeRect(shape.startX, shape.startY, shape.width, shape.height);
            }
        })
    }
}
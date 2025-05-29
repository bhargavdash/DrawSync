import { HTTP_URL } from "@/app/config";
import axios from "axios";

export type Shape = 
  | {
    type: "rect",
    startX: number,
    startY: number,
    width: number,
    height: number,
  }
  | {
    type: "circle",
    centerX: number,
    centerY: number,
    radius: number,
  }
  | {
    type: "diamond",
    centerX: number,
    centerY: number,
    width: number,
    height: number
  }

export type Tool = "rect" | "circle" | "diamond" | "pencil"

interface DrawingState {
    isDrawing: boolean,
    startX: number,
    startY: number,
    currentTool: Tool
}

export class Game {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private socket: WebSocket;
    private roomId: number;
    private existingShapes: Shape[] = [];
    private drawingState: DrawingState;

    // event handlers stored as class properties for easy cleanup
    private mouseDownHandler: (e: MouseEvent) => void;
    private mouseUpHandler: (e: MouseEvent) => void;
    private mouseMoveHandler: (e: MouseEvent) => void;
    private messageHandler: (event: MessageEvent) => void;

    constructor(canvas: HTMLCanvasElement, socket: WebSocket, roomId: number) {
        this.canvas = canvas;
        this.socket = socket;
        this.roomId = roomId;

        const ctx = canvas.getContext("2d");
        if(!ctx){
            throw new Error("Unable to get 2D context from canvas");
        }
        this.ctx = ctx;

        this.drawingState = {
            isDrawing: false,
            startX: 0,
            startY: 0,
            currentTool: "rect"
        };

        // bind event handlers
        this.mouseDownHandler = this.handleMouseDown.bind(this);
        this.mouseUpHandler = this.handleMouseUp.bind(this);
        this.mouseMoveHandler = this.handleMouseMove.bind(this);
        this.messageHandler = this.handleWebSocketMessage.bind(this);
    }

    // public method to initialize the game
    public async initialize(currentTool: Tool = "rect"): Promise<void> {
        this.drawingState.currentTool = currentTool;

        // load existing shapes
        await this.loadExistingShapes();

        console.log("Previous shapes loaded: ", this.existingShapes);
        console.log("Current tool:", currentTool);

        // initial render
        this.render();

        // add event listeners
        this.addEventListeners();
    }

    // public method to set tools
    public setTool(tool: Tool): void {
        this.drawingState.currentTool = tool;
        console.log("Tool changed to: ", tool);
    }

    // public method to change tools
    public getCurrentTool(): Tool {
        return this.drawingState.currentTool;
    }

    // public cleanup method
    public cleanup(): void {
        this.removeEventListeners();
        console.log("Game cleanup completed")
    }

    // private method to load existing shapes
    private async loadExistingShapes(): Promise<void> {
        try{
            const response = await axios.get(`${HTTP_URL}/chats/${this.roomId}`);
            const chats = response.data.chats;

            this.existingShapes = chats.map((chat: {message: string}) => {
                return JSON.parse(chat.message);
            });
        } catch(error){
            console.log("Error loading existing shapes:", error);
            this.existingShapes = [];
        }
    }

    // private method to add event listeners
    private addEventListeners(): void {
        this.canvas.addEventListener("mousedown", this.mouseDownHandler);
        this.canvas.addEventListener("mouseup", this.mouseUpHandler);
        this.canvas.addEventListener("mousemove", this.mouseMoveHandler);
        this.socket.addEventListener("message", this.messageHandler);
    }

    // private method to remove event listeners
    private removeEventListeners(): void {
        this.canvas.removeEventListener("mousedown", this.mouseDownHandler);
        this.canvas.removeEventListener("mouseup", this.mouseUpHandler);
        this.canvas.removeEventListener("mousemove", this.mouseMoveHandler);
        this.socket.removeEventListener("message", this.messageHandler);
    }

    // mouse event handlers
    private handleMouseDown(e: MouseEvent): void {
        this.drawingState.isDrawing = true;
        this.drawingState.startX = e.clientX;
        this.drawingState.startY = e.clientY;
    }

    private handleMouseUp(e: MouseEvent): void {
        if(!this.drawingState.isDrawing) return;
        
        this.drawingState.isDrawing = false;
        
        const endX = e.clientX;
        const endY = e.clientY;

        const shape = this.createShape(
            this.drawingState.startX,
            this.drawingState.startY,
            endX,
            endY,
            this.drawingState.currentTool
        );

        if(shape){
            this.addShape(shape);
            this.sendShapeToServer(shape);
        }
    }

    private handleMouseMove(e: MouseEvent): void {
        if(!this.drawingState.isDrawing) return;

        const currentX = e.clientX;
        const currentY = e.clientY;

        // create preview shape
        const previewShape = this.createShape(
            this.drawingState.startX,
            this.drawingState.startY,
            currentX,
            currentY,
            this.drawingState.currentTool
        );

        if(previewShape){
            this.renderWithPreview(previewShape);
        }
    }

    // WebSocket message handler;
    private handleWebSocketMessage(event: MessageEvent): void {
        try{
            const parsedData = JSON.parse(event.data);

            if(parsedData.type === "chat"){
                const newShape = JSON.parse(parsedData.message);
                this.addShape(newShape);
                console.log("New shape received and added: ", newShape);
            } else{
                console.log("Non-chat message received: ", parsedData.type);
            }
        } catch(error){
            console.error("Error parsing websocket message: ", error);
        }
    }

    // shape creating factory method
    private createShape(startX: number, startY: number, endX: number, endY: number, tool: Tool): Shape | null {
        console.log("Currently drawing: ", tool);
        switch(tool) {
            case "rect": 
              return {
                type: "rect",
                startX,
                startY,
                width: endX - startX,
                height: endY - startY
              };
            case "circle": 
              return {
                type: "circle",
                centerX: (endX + startX)/2,
                centerY: (endY + startY)/2,
                radius: Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2) / 2,
              };
            
            case "diamond":
              return {
                type: "diamond",
                centerX: (endX + startX) / 2,
                centerY: (endY + startY) / 2,
                width: Math.abs(endX - startX),
                height: Math.abs(endY - startY),
              }
            
            // add more shapes here as we implement them
            default:
                console.warn(`Tool ${tool} not implemented yet`);
                return null;
        }
    }

    // add shape to existing shapes and re-render

    private addShape(shape: Shape): void {
        this.existingShapes.push(shape);
        this.render();
    }

    // send shape to server via websocket
    private sendShapeToServer(shape: Shape): void {
        const message = {
            type: "chat",
            message: JSON.stringify(shape),
            roomId: this.roomId,
        };

        this.socket.send(JSON.stringify(message));
    }

    // main render method
    private render(): void {
        this.clearCanvas();

        this.drawAllShapes();
    }

    // render with preview for live drawing 
    private renderWithPreview(previewShape: Shape): void {
        this.clearCanvas();
        this.drawAllShapes();
        this.drawShape(previewShape);
    }

    // clear the entire canvas
    private clearCanvas(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    // draw all existing shapes
    private drawAllShapes(): void {
        this.existingShapes.forEach(shape => this.drawShape(shape));
    }

    // draw a single shape
    private drawShape(shape: Shape): void {
        this.ctx.strokeStyle = "white";
        this.ctx.lineWidth = 2;

        switch(shape.type) {
            case "rect": 
              this.ctx.strokeRect(shape.startX, shape.startY, shape.width, shape.height);
              break;
            
            case "circle":
                this.ctx.beginPath();
                this.ctx.arc(shape.centerX, shape.centerY, shape.radius, 0, 2 * Math.PI);
                this.ctx.stroke();
                break;

            case "diamond":
                this.ctx.beginPath();
                this.ctx.moveTo(shape.centerX, shape.centerY - shape.height/2); // top
                this.ctx.lineTo(shape.centerX + shape.width/2, shape.centerY); // right
                this.ctx.lineTo(shape.centerX, shape.centerY + shape.height/2); // bottom
                this.ctx.lineTo(shape.centerX - shape.width/2, shape.centerY); // left
                this.ctx.closePath();
                this.ctx.stroke();
                break; 
            // add more shape rendering

            default:
                console.warn(`Shape type not implemented`)
        }
    }

    // utility methods for external access
    public getShapes(): Shape[] {
        return [...this.existingShapes];
    }

    public clearAllShapes(): void {
        this.existingShapes = [];
        this.render();
    }

    // add method to manually add shapes (useful for undo/redo functionality later)
    public addExternalShape(shape: Shape): void {
        this.addShape(shape);
    }
}
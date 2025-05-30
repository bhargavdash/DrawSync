// import { HTTP_URL } from "@/app/config";
// import axios from "axios";

// export type Shape = 
//   | {
//     type: "rect",
//     startX: number,
//     startY: number,
//     width: number,
//     height: number,
//   }
//   | {
//     type: "circle",
//     centerX: number,
//     centerY: number,
//     radius: number,
//   }
//   | {
//     type: "diamond",
//     centerX: number,
//     centerY: number,
//     width: number,
//     height: number
//   }

// export type Tool = "rect" | "circle" | "diamond" | "pencil"

// interface DrawingState {
//     isDrawing: boolean,
//     startX: number,
//     startY: number,
//     currentTool: Tool
// }

// export class Game {
//     private canvas: HTMLCanvasElement;
//     private ctx: CanvasRenderingContext2D;
//     private socket: WebSocket;
//     private roomId: number;
//     private existingShapes: Shape[] = [];
//     private drawingState: DrawingState;

//     // event handlers stored as class properties for easy cleanup
//     private mouseDownHandler: (e: MouseEvent) => void;
//     private mouseUpHandler: (e: MouseEvent) => void;
//     private mouseMoveHandler: (e: MouseEvent) => void;
//     private messageHandler: (event: MessageEvent) => void;

//     constructor(canvas: HTMLCanvasElement, socket: WebSocket, roomId: number) {
//         this.canvas = canvas;
//         this.socket = socket;
//         this.roomId = roomId;

//         const ctx = canvas.getContext("2d");
//         if(!ctx){
//             throw new Error("Unable to get 2D context from canvas");
//         }
//         this.ctx = ctx;

//         this.drawingState = {
//             isDrawing: false,
//             startX: 0,
//             startY: 0,
//             currentTool: "rect"
//         };

//         // bind event handlers
//         this.mouseDownHandler = this.handleMouseDown.bind(this);
//         this.mouseUpHandler = this.handleMouseUp.bind(this);
//         this.mouseMoveHandler = this.handleMouseMove.bind(this);
//         this.messageHandler = this.handleWebSocketMessage.bind(this);
//     }

//     // public method to initialize the game
//     public async initialize(currentTool: Tool = "rect"): Promise<void> {
//         this.drawingState.currentTool = currentTool;

//         // load existing shapes
//         await this.loadExistingShapes();

//         console.log("Previous shapes loaded: ", this.existingShapes);
//         console.log("Current tool:", currentTool);

//         // initial render
//         this.render();

//         // add event listeners
//         this.addEventListeners();
//     }

//     // public method to set tools
//     public setTool(tool: Tool): void {
//         this.drawingState.currentTool = tool;
//         console.log("Tool changed to: ", tool);
//     }

//     // public method to change tools
//     public getCurrentTool(): Tool {
//         return this.drawingState.currentTool;
//     }

//     // public cleanup method
//     public cleanup(): void {
//         this.removeEventListeners();
//         console.log("Game cleanup completed")
//     }

//     // private method to load existing shapes
//     private async loadExistingShapes(): Promise<void> {
//         try{
//             const response = await axios.get(`${HTTP_URL}/chats/${this.roomId}`);
//             const chats = response.data.chats;

//             this.existingShapes = chats.map((chat: {message: string}) => {
//                 return JSON.parse(chat.message);
//             });
//         } catch(error){
//             console.log("Error loading existing shapes:", error);
//             this.existingShapes = [];
//         }
//     }

//     // private method to add event listeners
//     private addEventListeners(): void {
//         this.canvas.addEventListener("mousedown", this.mouseDownHandler);
//         this.canvas.addEventListener("mouseup", this.mouseUpHandler);
//         this.canvas.addEventListener("mousemove", this.mouseMoveHandler);
//         this.socket.addEventListener("message", this.messageHandler);
//     }

//     // private method to remove event listeners
//     private removeEventListeners(): void {
//         this.canvas.removeEventListener("mousedown", this.mouseDownHandler);
//         this.canvas.removeEventListener("mouseup", this.mouseUpHandler);
//         this.canvas.removeEventListener("mousemove", this.mouseMoveHandler);
//         this.socket.removeEventListener("message", this.messageHandler);
//     }

//     // mouse event handlers
//     private handleMouseDown(e: MouseEvent): void {
//         this.drawingState.isDrawing = true;
//         this.drawingState.startX = e.clientX;
//         this.drawingState.startY = e.clientY;
//     }

//     private handleMouseUp(e: MouseEvent): void {
//         if(!this.drawingState.isDrawing) return;
        
//         this.drawingState.isDrawing = false;
        
//         const endX = e.clientX;
//         const endY = e.clientY;

//         const shape = this.createShape(
//             this.drawingState.startX,
//             this.drawingState.startY,
//             endX,
//             endY,
//             this.drawingState.currentTool
//         );

//         if(shape){
//             this.addShape(shape);
//             this.sendShapeToServer(shape);
//         }
//     }

//     private handleMouseMove(e: MouseEvent): void {
//         if(!this.drawingState.isDrawing) return;

//         const currentX = e.clientX;
//         const currentY = e.clientY;

//         // create preview shape
//         const previewShape = this.createShape(
//             this.drawingState.startX,
//             this.drawingState.startY,
//             currentX,
//             currentY,
//             this.drawingState.currentTool
//         );

//         if(previewShape){
//             this.renderWithPreview(previewShape);
//         }
//     }

//     // WebSocket message handler;
//     private handleWebSocketMessage(event: MessageEvent): void {
//         try{
//             const parsedData = JSON.parse(event.data);

//             if(parsedData.type === "chat"){
//                 const newShape = JSON.parse(parsedData.message);
//                 this.addShape(newShape);
//                 console.log("New shape received and added: ", newShape);
//             } else{
//                 console.log("Non-chat message received: ", parsedData.type);
//             }
//         } catch(error){
//             console.error("Error parsing websocket message: ", error);
//         }
//     }

//     // shape creating factory method
//     private createShape(startX: number, startY: number, endX: number, endY: number, tool: Tool): Shape | null {
//         console.log("Currently drawing: ", tool);
//         switch(tool) {
//             case "rect": 
//               return {
//                 type: "rect",
//                 startX,
//                 startY,
//                 width: endX - startX,
//                 height: endY - startY
//               };
//             case "circle": 
//               return {
//                 type: "circle",
//                 centerX: (endX + startX)/2,
//                 centerY: (endY + startY)/2,
//                 radius: Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2) / 2,
//               };
            
//             case "diamond":
//               return {
//                 type: "diamond",
//                 centerX: (endX + startX) / 2,
//                 centerY: (endY + startY) / 2,
//                 width: Math.abs(endX - startX),
//                 height: Math.abs(endY - startY),
//               }
            
//             // add more shapes here as we implement them
//             default:
//                 console.warn(`Tool ${tool} not implemented yet`);
//                 return null;
//         }
//     }

//     // add shape to existing shapes and re-render

//     private addShape(shape: Shape): void {
//         this.existingShapes.push(shape);
//         this.render();
//     }

//     // send shape to server via websocket
//     private sendShapeToServer(shape: Shape): void {
//         const message = {
//             type: "chat",
//             message: JSON.stringify(shape),
//             roomId: this.roomId,
//         };

//         this.socket.send(JSON.stringify(message));
//     }

//     // main render method
//     private render(): void {
//         this.clearCanvas();

//         this.drawAllShapes();
//     }

//     // render with preview for live drawing 
//     private renderWithPreview(previewShape: Shape): void {
//         this.clearCanvas();
//         this.drawAllShapes();
//         this.drawShape(previewShape);
//     }

//     // clear the entire canvas
//     private clearCanvas(): void {
//         this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
//     }

//     // draw all existing shapes
//     private drawAllShapes(): void {
//         this.existingShapes.forEach(shape => this.drawShape(shape));
//     }

//     // draw a single shape
//     private drawShape(shape: Shape): void {
//         this.ctx.strokeStyle = "white";
//         this.ctx.lineWidth = 2;

//         switch(shape.type) {
//             case "rect": 
//               this.ctx.strokeRect(shape.startX, shape.startY, shape.width, shape.height);
//               break;
            
//             case "circle":
//                 this.ctx.beginPath();
//                 this.ctx.arc(shape.centerX, shape.centerY, shape.radius, 0, 2 * Math.PI);
//                 this.ctx.stroke();
//                 break;

//             case "diamond":
//                 this.ctx.beginPath();
//                 this.ctx.moveTo(shape.centerX, shape.centerY - shape.height/2); // top
//                 this.ctx.lineTo(shape.centerX + shape.width/2, shape.centerY); // right
//                 this.ctx.lineTo(shape.centerX, shape.centerY + shape.height/2); // bottom
//                 this.ctx.lineTo(shape.centerX - shape.width/2, shape.centerY); // left
//                 this.ctx.closePath();
//                 this.ctx.stroke();
//                 break; 
//             // add more shape rendering

//             default:
//                 console.warn(`Shape type not implemented`)
//         }
//     }

//     // utility methods for external access
//     public getShapes(): Shape[] {
//         return [...this.existingShapes];
//     }

//     public clearAllShapes(): void {
//         this.existingShapes = [];
//         this.render();
//     }

//     // add method to manually add shapes (useful for undo/redo functionality later)
//     public addExternalShape(shape: Shape): void {
//         this.addShape(shape);
//     }
// }

import axios from "axios";
import { HTTP_URL } from "@/app/config";

export type Shape =
  | {
      type: "rect";
      startX: number;
      startY: number;
      width: number;
      height: number;
      color: string;
      id: string;
    }
  | {
      type: "circle";
      centerX: number;
      centerY: number;
      radius: number;
      color: string;
      id: string;
    }
  | {
      type: "diamond";
      centerX: number;
      centerY: number;
      width: number;
      height: number;
      color: string;
      id: string;
    };

export type Tool = "rect" | "circle" | "diamond" | "pencil" | "select";

interface DrawingState {
  isDrawing: boolean;
  startX: number;
  startY: number;
  currentTool: Tool;
  currentColor: string;
}

interface ViewportState {
  scale: number;
  offsetX: number;
  offsetY: number;
  isDragging: boolean;
  lastMouseX: number;
  lastMouseY: number;
}

interface SelectionState {
  selectedShapeId: string | null;
  selectionBox: {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
  } | null;
}

interface HistoryState {
  undoStack: Shape[][];
  redoStack: Shape[][];
  maxHistorySize: number;
}

export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private socket: WebSocket;
  private roomId: number;
  private existingShapes: Shape[] = [];
  private drawingState: DrawingState;
  private viewportState: ViewportState;
  private selectionState: SelectionState;
  private historyState: HistoryState;
  
  // Event handlers
  private mouseDownHandler: (e: MouseEvent) => void;
  private mouseUpHandler: (e: MouseEvent) => void;
  private mouseMoveHandler: (e: MouseEvent) => void;

  // for zooming while scroll
  private wheelHandler: (e: WheelEvent) => void;
  // for delete backspace ctrl+z etc
  private keyDownHandler: (e: KeyboardEvent) => void;
  // for websocket message 
  private messageHandler: (event: MessageEvent) => void;

  constructor(canvas: HTMLCanvasElement, socket: WebSocket, roomId: number) {
    this.canvas = canvas;
    this.socket = socket;
    this.roomId = roomId;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Unable to get 2D context from canvas");
    }
    this.ctx = ctx;

    this.drawingState = {
      isDrawing: false,
      startX: 0,
      startY: 0,
      currentTool: "rect",
      currentColor: "#ffffff"
    };

    this.viewportState = {
      scale: 1,
      offsetX: 0,
      offsetY: 0,
      isDragging: false,
      lastMouseX: 0,
      lastMouseY: 0
    };

    this.selectionState = {
      selectedShapeId: null,
      selectionBox: null
    };

    this.historyState = {
      undoStack: [],
      redoStack: [],
      maxHistorySize: 50
    };

    // Bind event handlers
    this.mouseDownHandler = this.handleMouseDown.bind(this);
    this.mouseUpHandler = this.handleMouseUp.bind(this);
    this.mouseMoveHandler = this.handleMouseMove.bind(this);
    this.wheelHandler = this.handleWheel.bind(this);
    this.keyDownHandler = this.handleKeyDown.bind(this);
    this.messageHandler = this.handleWebSocketMessage.bind(this);
  }

  // === PUBLIC METHODS ===

  public async initialize(currentTool: Tool = "rect"): Promise<void> {
    this.drawingState.currentTool = currentTool;
    
    await this.loadExistingShapes();
    this.saveToHistory();
    console.log("Previous shapes loaded:", this.existingShapes);
    
    this.render();
    this.addEventListeners();
  }

  public setTool(tool: Tool): void {
    this.drawingState.currentTool = tool;
    this.selectionState.selectedShapeId = null; // Clear selection when changing tools
    this.render();
  }

  public setColor(color: string): void {
    this.drawingState.currentColor = color;
  }

  public getCurrentTool(): Tool {
    return this.drawingState.currentTool;
  }

  public getCurrentColor(): string {
    return this.drawingState.currentColor;
  }

  // === UNDO/REDO METHODS ===

  public undo(): boolean {
    if (this.historyState.undoStack.length <= 1) return false;
    
    const currentState = this.historyState.undoStack.pop()!;
    this.historyState.redoStack.push(currentState);
    
    if (this.historyState.redoStack.length > this.historyState.maxHistorySize) {
      // remove the first element
      this.historyState.redoStack.shift();
    }
    
    this.existingShapes = [...this.historyState.undoStack[this.historyState.undoStack.length - 1]];
    this.render();
    return true;
  }

  public redo(): boolean {
    if (this.historyState.redoStack.length === 0) return false;
    
    const nextState = this.historyState.redoStack.pop()!;
    this.historyState.undoStack.push(nextState);
    
    this.existingShapes = [...nextState];
    this.render();
    return true;
  }

  public canUndo(): boolean {
    return this.historyState.undoStack.length > 1;
  }

  public canRedo(): boolean {
    return this.historyState.redoStack.length > 0;
  }

  // === SELECTION METHODS ===

  public selectShape(shapeId: string): void {
    this.selectionState.selectedShapeId = shapeId;
    this.render();
  }

  public getSelectedShape(): Shape | null {
    if (!this.selectionState.selectedShapeId) return null;
    return this.existingShapes.find(shape => shape.id === this.selectionState.selectedShapeId) || null;
  }

  public deleteSelectedShape(): void {
    if (!this.selectionState.selectedShapeId) return;
    
    this.existingShapes = this.existingShapes.filter(
      shape => shape.id !== this.selectionState.selectedShapeId
    );
    this.selectionState.selectedShapeId = null;
    this.saveToHistory();
    this.render();
    this.broadcastShapes();
  }

  // === ZOOM/PAN METHODS ===

  public zoomIn(centerX?: number, centerY?: number): void {
    this.zoom(1.2, centerX, centerY);
  }

  public zoomOut(centerX?: number, centerY?: number): void {
    this.zoom(0.8, centerX, centerY);
  }

  public resetZoom(): void {
    this.viewportState.scale = 1;
    this.viewportState.offsetX = 0;
    this.viewportState.offsetY = 0;
    this.render();
  }

  public pan(deltaX: number, deltaY: number): void {
    this.viewportState.offsetX += deltaX;
    this.viewportState.offsetY += deltaY;
    this.render();
  }

  // === EXPORT/IMPORT METHODS ===

  public exportCanvas(): string {
    return JSON.stringify({
      shapes: this.existingShapes,
      viewport: {
        scale: this.viewportState.scale,
        offsetX: this.viewportState.offsetX,
        offsetY: this.viewportState.offsetY
      }
    }, null, 2);
  }

  public importCanvas(data: string): boolean {
    try {
      const parsed = JSON.parse(data);
      if (parsed.shapes && Array.isArray(parsed.shapes)) {
        this.existingShapes = parsed.shapes;
        if (parsed.viewport) {
          this.viewportState.scale = parsed.viewport.scale || 1;
          this.viewportState.offsetX = parsed.viewport.offsetX || 0;
          this.viewportState.offsetY = parsed.viewport.offsetY || 0;
        }
        this.saveToHistory();
        this.render();
        this.broadcastShapes();
        return true;
      }
    } catch (error) {
      console.error("Failed to import canvas data:", error);
    }
    return false;
  }

  public exportAsPNG(): string {
    // Create temporary canvas without UI elements
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = this.canvas.width;
    tempCanvas.height = this.canvas.height;
    const tempCtx = tempCanvas.getContext('2d')!;
    
    // Fill with white background
    tempCtx.fillStyle = 'white';
    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
    
    // Apply current viewport transformations
    tempCtx.save();
    tempCtx.scale(this.viewportState.scale, this.viewportState.scale);
    tempCtx.translate(this.viewportState.offsetX, this.viewportState.offsetY);
    
    // Draw all shapes
    this.existingShapes.forEach(shape => {
      this.drawShapeOnContext(tempCtx, shape);
    });
    
    tempCtx.restore();
    return tempCanvas.toDataURL('image/png');
  }

  public cleanup(): void {
    this.removeEventListeners();
    console.log("Game cleanup completed");
  }

  // === PRIVATE METHODS ===

  private async loadExistingShapes(): Promise<void> {
    try {
      const response = await axios.get(`${HTTP_URL}/chats/${this.roomId}`);
      const chats = response.data.chats;

      this.existingShapes = chats.map((chat: { message: string }) => {
        const shape = JSON.parse(chat.message);
        // Add id and color if missing (for backward compatibility)
        if (!shape.id) shape.id = this.generateId();
        if (!shape.color) shape.color = "#ffffff";
        return shape;
      });
    } catch (error) {
      console.error("Error loading existing shapes:", error);
      this.existingShapes = [];
    }
  }

  private addEventListeners(): void {
    this.canvas.addEventListener("mousedown", this.mouseDownHandler);
    this.canvas.addEventListener("mouseup", this.mouseUpHandler);
    this.canvas.addEventListener("mousemove", this.mouseMoveHandler);
    this.canvas.addEventListener("wheel", this.wheelHandler);
    document.addEventListener("keydown", this.keyDownHandler);
    this.socket.addEventListener("message", this.messageHandler);
  }

  private removeEventListeners(): void {
    this.canvas.removeEventListener("mousedown", this.mouseDownHandler);
    this.canvas.removeEventListener("mouseup", this.mouseUpHandler);
    this.canvas.removeEventListener("mousemove", this.mouseMoveHandler);
    this.canvas.removeEventListener("wheel", this.wheelHandler);
    document.removeEventListener("keydown", this.keyDownHandler);
    this.socket.removeEventListener("message", this.messageHandler);
  }

  // === EVENT HANDLERS ===

  private handleMouseDown(e: MouseEvent): void {
    const { x, y } = this.getMousePosition(e);
    
    if (this.drawingState.currentTool === "select") {
      const clickedShape = this.getShapeAtPosition(x, y);
      if (clickedShape) {
        this.selectShape(clickedShape.id);
      } else {
        this.selectionState.selectedShapeId = null;
        this.render();
      }
      return;
    }

    // Handle pan mode (middle mouse or space+click)
    if (e.button === 1 || (e.button === 0 && e.ctrlKey)) {
      this.viewportState.isDragging = true;
      this.viewportState.lastMouseX = e.clientX;
      this.viewportState.lastMouseY = e.clientY;
      return;
    }

    // Normal drawing
    this.drawingState.isDrawing = true;
    this.drawingState.startX = x;
    this.drawingState.startY = y;
  }

  private handleMouseUp(e: MouseEvent): void {
    if (this.viewportState.isDragging) {
      this.viewportState.isDragging = false;
      return;
    }

    if (!this.drawingState.isDrawing || this.drawingState.currentTool === "select") return;
    
    this.drawingState.isDrawing = false;
    const { x, y } = this.getMousePosition(e);

    const shape = this.createShape(
      this.drawingState.startX,
      this.drawingState.startY,
      x,
      y,
      this.drawingState.currentTool
    );

    if (shape) {
      this.addShape(shape);
      this.sendShapeToServer(shape);
      this.saveToHistory();
    }
  }

  private handleMouseMove(e: MouseEvent): void {
    const { x, y } = this.getMousePosition(e);

    // Handle panning
    if (this.viewportState.isDragging) {
      const deltaX = e.clientX - this.viewportState.lastMouseX;
      const deltaY = e.clientY - this.viewportState.lastMouseY;
      this.pan(deltaX / this.viewportState.scale, deltaY / this.viewportState.scale);
      this.viewportState.lastMouseX = e.clientX;
      this.viewportState.lastMouseY = e.clientY;
      return;
    }

    // Handle drawing preview
    if (!this.drawingState.isDrawing || this.drawingState.currentTool === "select") return;

    const previewShape = this.createShape(
      this.drawingState.startX,
      this.drawingState.startY,
      x,
      y,
      this.drawingState.currentTool
    );

    if (previewShape) {
      this.renderWithPreview(previewShape);
    }
  }

  private handleWheel(e: WheelEvent): void {
    e.preventDefault();
    const { x, y } = this.getMousePosition(e);
    
    if (e.deltaY < 0) {
      this.zoomIn(x, y);
    } else {
      this.zoomOut(x, y);
    }
  }

  private handleKeyDown(e: KeyboardEvent): void {
    // Only handle if canvas is focused or no input is focused
    if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') {
      return;
    }

    if (e.ctrlKey || e.metaKey) {
      switch (e.key.toLowerCase()) {
        case 'z':
          e.preventDefault();
          if (e.shiftKey) {
            this.redo();
          } else {
            this.undo();
          }
          break;
        case 'y':
          e.preventDefault();
          this.redo();
          break;
        case 's':
          e.preventDefault();
          this.downloadExport();
          break;
        case '0':
          e.preventDefault();
          this.resetZoom();
          break;
      }
    } else {
      switch (e.key) {
        case 'Delete':
        case 'Backspace':
          this.deleteSelectedShape();
          break;
        case 'Escape':
          this.selectionState.selectedShapeId = null;
          this.render();
          break;
      }
    }
  }

  private handleWebSocketMessage(event: MessageEvent): void {
    try {
      const parsedData = JSON.parse(event.data);

      if (parsedData.type === "chat") {
        const newShape = JSON.parse(parsedData.message);
        // Add id and color if missing
        if (!newShape.id) newShape.id = this.generateId();
        if (!newShape.color) newShape.color = "#ffffff";
        
        this.addShape(newShape, false); // Don't save to history for remote shapes
        console.log("New shape received:", newShape);
      }
    } catch (error) {
      console.error("Error parsing WebSocket message:", error);
    }
  }

  // === UTILITY METHODS ===

  private getMousePosition(e: MouseEvent): { x: number; y: number } {
    const rect = this.canvas.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;
    
    // Apply inverse viewport transformation
    const x = (clientX / this.viewportState.scale) - this.viewportState.offsetX;
    const y = (clientY / this.viewportState.scale) - this.viewportState.offsetY;
    
    return { x, y };
  }

  private getShapeAtPosition(x: number, y: number): Shape | null {
    // Check shapes in reverse order (top to bottom)
    for (let i = this.existingShapes.length - 1; i >= 0; i--) {
      const shape = this.existingShapes[i];
      if (this.isPointInShape(x, y, shape)) {
        return shape;
      }
    }
    return null;
  }

  private isPointInShape(x: number, y: number, shape: Shape): boolean {
    switch (shape.type) {
      case "rect":
        return x >= shape.startX && x <= shape.startX + shape.width &&
               y >= shape.startY && y <= shape.startY + shape.height;
      
      case "circle":
        const dx = x - shape.centerX;
        const dy = y - shape.centerY;
        return Math.sqrt(dx * dx + dy * dy) <= shape.radius;
      
      case "diamond":
        // Simple bounding box check for diamond
        return x >= shape.centerX - shape.width/2 && x <= shape.centerX + shape.width/2 &&
               y >= shape.centerY - shape.height/2 && y <= shape.centerY + shape.height/2;
      
      default:
        return false;
    }
  }

  private zoom(factor: number, centerX?: number, centerY?: number): void {
    const oldScale = this.viewportState.scale;
    this.viewportState.scale *= factor;
    
    // Clamp zoom level
    this.viewportState.scale = Math.max(0.1, Math.min(5, this.viewportState.scale));
    
    if (centerX !== undefined && centerY !== undefined) {
      // Zoom towards the specified point
      const scaleDiff = this.viewportState.scale - oldScale;
      this.viewportState.offsetX -= (centerX * scaleDiff) / this.viewportState.scale;
      this.viewportState.offsetY -= (centerY * scaleDiff) / this.viewportState.scale;
    }
    
    this.render();
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private saveToHistory(): void {
    const currentState = [...this.existingShapes];
    this.historyState.undoStack.push(currentState);
    
    if (this.historyState.undoStack.length > this.historyState.maxHistorySize) {
      this.historyState.undoStack.shift();
    }
    
    // Clear redo stack when new action is performed
    this.historyState.redoStack = [];
  }

  private createShape(startX: number, startY: number, endX: number, endY: number, tool: Tool): Shape | null {
    const id = this.generateId();
    const color = this.drawingState.currentColor;

    switch (tool) {
      case "rect":
        return {
          type: "rect",
          startX,
          startY,
          width: endX - startX,
          height: endY - startY,
          color,
          id,
        };
      
      case "circle":
        return {
          type: "circle",
          centerX: (endX + startX) / 2,
          centerY: (endY + startY) / 2,
          radius: Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2) / 2,
          color,
          id,
        };
      
      case "diamond":
        return {
          type: "diamond",
          centerX: (endX + startX) / 2,
          centerY: (endY + startY) / 2,
          width: Math.abs(endX - startX),
          height: Math.abs(endY - startY),
          color,
          id,
        };
      
      default:
        return null;
    }
  }

  private addShape(shape: Shape, saveHistory: boolean = true): void {
    this.existingShapes.push(shape);
    if (saveHistory) {
      this.saveToHistory();
    }
    this.render();
  }

  private sendShapeToServer(shape: Shape): void {
    const message = {
      type: "chat",
      message: JSON.stringify(shape),
      roomId: this.roomId,
    };
    this.socket.send(JSON.stringify(message));
  }

  private broadcastShapes(): void {
    // Send all shapes to keep everyone in sync
    this.existingShapes.forEach(shape => {
      this.sendShapeToServer(shape);
    });
  }

  // made this public to fix the error in client component
  public render(): void {
    this.clearCanvas();
    this.applyViewportTransform();
    this.drawAllShapes();
    this.drawSelectionIndicator();
    this.resetViewportTransform();
  }

  private renderWithPreview(previewShape: Shape): void {
    this.clearCanvas();
    this.applyViewportTransform();
    this.drawAllShapes();
    this.drawShape(previewShape);
    this.drawSelectionIndicator();
    this.resetViewportTransform();
  }

  private clearCanvas(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private applyViewportTransform(): void {
    this.ctx.save();
    this.ctx.scale(this.viewportState.scale, this.viewportState.scale);
    this.ctx.translate(this.viewportState.offsetX, this.viewportState.offsetY);
  }

  private resetViewportTransform(): void {
    this.ctx.restore();
  }

  private drawAllShapes(): void {
    this.existingShapes.forEach(shape => this.drawShape(shape));
  }

  private drawShape(shape: Shape): void {
    this.drawShapeOnContext(this.ctx, shape);
  }

  private drawShapeOnContext(ctx: CanvasRenderingContext2D, shape: Shape): void {
    ctx.strokeStyle = shape.color;
    ctx.lineWidth = 2;

    switch (shape.type) {
      case "rect":
        ctx.strokeRect(shape.startX, shape.startY, shape.width, shape.height);
        break;
      
      case "circle":
        ctx.beginPath();
        ctx.arc(shape.centerX, shape.centerY, shape.radius, 0, 2 * Math.PI);
        ctx.stroke();
        break;
      
      case "diamond":
        const { centerX, centerY, width, height } = shape;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY - height/2); // top
        ctx.lineTo(centerX + width/2, centerY); // right
        ctx.lineTo(centerX, centerY + height/2); // bottom
        ctx.lineTo(centerX - width/2, centerY); // left
        ctx.closePath();
        ctx.stroke();
        break;
    }
  }

  private drawSelectionIndicator(): void {
    if (!this.selectionState.selectedShapeId) return;
    
    const selectedShape = this.getSelectedShape();
    if (!selectedShape) return;

    this.ctx.strokeStyle = "#00ff00";
    this.ctx.lineWidth = 2;
    this.ctx.setLineDash([5, 5]);
    
    // Draw selection box around the shape
    const bounds = this.getShapeBounds(selectedShape);
    if (bounds) {
      this.ctx.strokeRect(
        bounds.x - 5, 
        bounds.y - 5, 
        bounds.width + 10, 
        bounds.height + 10
      );
    }
    
    this.ctx.setLineDash([]);
  }

  private getShapeBounds(shape: Shape): { x: number; y: number; width: number; height: number } | null {
    switch (shape.type) {
      case "rect":
        return {
          x: shape.startX,
          y: shape.startY,
          width: shape.width,
          height: shape.height
        };
      
      case "circle":
        return {
          x: shape.centerX - shape.radius,
          y: shape.centerY - shape.radius,
          width: shape.radius * 2,
          height: shape.radius * 2
        };
      
      case "diamond":
        return {
          x: shape.centerX - shape.width/2,
          y: shape.centerY - shape.height/2,
          width: shape.width,
          height: shape.height
        };
      
      default:
        return null;
    }
  }

  private downloadExport(): void {
    const dataStr = this.exportCanvas();
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `canvas-export-${Date.now()}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
  }

  // === PUBLIC UTILITY METHODS ===

  public getShapes(): Shape[] {
    return [...this.existingShapes];
  }

  public clearAllShapes(): void {
    this.existingShapes = [];
    this.saveToHistory();
    this.render();
    this.broadcastShapes();
  }

  public getViewportInfo(): { scale: number; offsetX: number; offsetY: number } {
    return {
      scale: this.viewportState.scale,
      offsetX: this.viewportState.offsetX,
      offsetY: this.viewportState.offsetY
    };
  }
}
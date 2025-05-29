import { Tool } from "@/draw/Game"
import { Circle, Diamond, RectangleHorizontal } from "lucide-react"

export function ToolIcon({currTool, setCurrTool, toolName, toolAbbreviation}:
     {  currTool: Tool,
        setCurrTool: React.Dispatch<React.SetStateAction<Tool>>,
        toolName: string,
        toolAbbreviation: Tool
     }) {
        return <>
        <div onClick={() => setCurrTool(toolAbbreviation)}
            className={`text-gray-200 p-1 w-10 rounded-md hover:cursor-pointer flex justify-center items-center
            ${currTool ==  toolAbbreviation ? "bg-indigo-900": ""}`}>
            {toolName === "Rectangle" && <RectangleHorizontal />}
            {toolName === "Circle" && <Circle />}
            {toolName === "Diamond" && <Diamond />}
        </div>
        </>
     }
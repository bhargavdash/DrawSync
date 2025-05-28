import { Circle, RectangleHorizontal } from "lucide-react"

export function ToolIcon({currShape, setCurrShape, toolName, toolAbbreviation}:
     {  currShape: string,
        setCurrShape: React.Dispatch<React.SetStateAction<string>>,
        toolName: string,
        toolAbbreviation: string
     }) {
        return <>
        <div onClick={() => setCurrShape(toolAbbreviation)}
            className={`text-gray-200 p-1 w-10 rounded-md hover:cursor-pointer flex justify-center items-center
            ${currShape ==  toolAbbreviation ? "bg-indigo-900": ""}`}>
            {toolName === "Rectangle" && <RectangleHorizontal />}
            {toolName === "Circle" && <Circle />}
        </div>
        </>
     }
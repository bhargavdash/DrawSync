import { Tool } from "@/draw/Game"
import { ToolIcon } from "./ToolIcon"

export function Toolbar({currTool, setCurrTool}:
     {  currTool: Tool,
        setCurrTool: React.Dispatch<React.SetStateAction<Tool>>
     }){
        return<>
        <div className='absolute left-50 top-4 flex gap-2 bg-zinc-800 p-2 rounded-md'>
            {/* render rectangle option */}
            <ToolIcon currTool={currTool} setCurrTool={setCurrTool}
             toolName="Rectangle" toolAbbreviation="rect" />

            {/* render circle option */}
            <ToolIcon currTool={currTool} setCurrTool={setCurrTool}
             toolName="Circle" toolAbbreviation="circle" />
            
            {/* render diamond option */}
            <ToolIcon currTool={currTool} setCurrTool={setCurrTool}
             toolName="Diamond" toolAbbreviation="diamond" />
        </div>
        </>
}
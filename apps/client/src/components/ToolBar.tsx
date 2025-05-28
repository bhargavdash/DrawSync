import { ToolIcon } from "./ToolIcon"

export function Toolbar({currShape, setCurrShape}:
     {  currShape: string,
        setCurrShape: React.Dispatch<React.SetStateAction<string>>
     }){
        return<>
        <div className='absolute left-50 top-4 flex gap-2 bg-zinc-800 p-2 rounded-md'>
            <ToolIcon currShape={currShape} setCurrShape={setCurrShape}
             toolName="Rectangle" toolAbbreviation="rect" />
             <ToolIcon currShape={currShape} setCurrShape={setCurrShape}
             toolName="Circle" toolAbbreviation="circle" />
        </div>
        </>
}
// import { Tool } from "@/draw/Game"
// import { ToolIcon } from "./ToolIcon"

// export function Toolbar({currTool, setCurrTool}:
//      {  currTool: Tool,
//         setCurrTool: React.Dispatch<React.SetStateAction<Tool>>
//      }){
//         return<>
//         <div className='absolute left-50 top-4 flex gap-2 bg-zinc-800 p-2 rounded-md'>
//             {/* render rectangle option */}
//             <ToolIcon currTool={currTool} setCurrTool={setCurrTool}
//              toolName="Rectangle" toolAbbreviation="rect" />

//             {/* render circle option */}
//             <ToolIcon currTool={currTool} setCurrTool={setCurrTool}
//              toolName="Circle" toolAbbreviation="circle" />
            
//             {/* render diamond option */}
//             <ToolIcon currTool={currTool} setCurrTool={setCurrTool}
//              toolName="Diamond" toolAbbreviation="diamond" />
//         </div>
//         </>
// }

import React, { useRef } from 'react';
import { Game, Tool } from '@/draw/Game';
import { RefreshCcw, ZoomIn, ZoomOut } from 'lucide-react';

interface ToolbarProps {
  currShape: Tool;
  setCurrShape: (shape: Tool) => void;
  currColor: string;
  setCurrColor: (color: string) => void;
  gameRef: React.RefObject<Game | null>; // Reference to the game instance
}

const COLORS = [
  '#ffffff', // White
  '#000000', // Black
  '#ff0000', // Red
  '#00ff00', // Green
  '#0000ff', // Blue
  '#ffff00', // Yellow
  '#ff00ff', // Magenta
  '#00ffff', // Cyan
  '#ffa500', // Orange
  '#800080', // Purple
];

const TOOLS = [
  { id: 'select' as Tool, label: 'Select', icon: '↖' },
  { id: 'rect' as Tool, label: 'Rectangle', icon: '▭' },
  { id: 'circle' as Tool, label: 'Circle', icon: '○' },
  { id: 'diamond' as Tool, label: 'Diamond', icon: '◇' },
  { id: 'pencil' as Tool, label: 'Pencil', icon: '✏' },
];

export function EnhancedToolbar({ 
  currShape, 
  setCurrShape, 
  currColor, 
  setCurrColor, 
  gameRef 
}: ToolbarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUndo = () => {
    gameRef.current?.undo();
  };

  const handleRedo = () => {
    gameRef.current?.redo();
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear the entire canvas?')) {
      gameRef.current?.clearAllShapes();
    }
  };

  const handleZoomIn = () => {
    gameRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    gameRef.current?.zoomOut();
  };

  const handleResetZoom = () => {
    gameRef.current?.resetZoom();
  };

  const handleExportJSON = () => {
    const game = gameRef.current;
    if (!game) return;

    const dataStr = game.exportCanvas();
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `canvas-export-${Date.now()}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
  };

  const handleExportPNG = () => {
    const game = gameRef.current;
    if (!game) return;

    const dataUrl = game.exportAsPNG();
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `canvas-export-${Date.now()}.png`;
    link.click();
  };

  const handleImport = () => {
    fileInputRef.current?.click();
  };

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const success = gameRef.current?.importCanvas(content);
      if (success) {
        alert('Canvas imported successfully!');
      } else {
        alert('Failed to import canvas. Please check the file format.');
      }
    };
    reader.readAsText(file);
    
    // Reset the input so the same file can be imported again
    event.target.value = '';
  };

  const handleDeleteSelected = () => {
    gameRef.current?.deleteSelectedShape();
  };

  const canUndo = gameRef.current?.canUndo() || false;
  const canRedo = gameRef.current?.canRedo() || false;
  const selectedShape = gameRef.current?.getSelectedShape();
  const viewportInfo = gameRef.current?.getViewportInfo() || { scale: 1, offsetX: 0, offsetY: 0 };

  return (
    <div className="fixed top-4 left-4 z-10 bg-gray-800 rounded-lg p-4 shadow-lg">
      {/* Tools Section */}
      <div className="mb-4">
        <h3 className="text-white text-sm font-semibold mb-2">Tools</h3>
        <div className="flex gap-2 flex-wrap">
          {TOOLS.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setCurrShape(tool.id)}
              className={`p-2 rounded transition-colors ${
                currShape === tool.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
              }`}
              title={tool.label}
            >
              <span className="text-lg">{tool.icon}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Colors Section */}
      <div className="mb-4">
        <h3 className="text-white text-sm font-semibold mb-2">Colors</h3>
        <div className="grid grid-cols-5 gap-2">
          {COLORS.map((color) => (
            <button
              key={color}
              onClick={() => setCurrColor(color)}
              className={`w-8 h-8 rounded border-2 transition-all ${
                currColor === color
                  ? 'border-blue-400 scale-110'
                  : 'border-gray-500 hover:border-gray-300'
              }`}
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
          {/* Custom Color Picker */}
          <input
            type="color"
            value={currColor}
            onChange={(e) => setCurrColor(e.target.value)}
            className="w-8 h-8 rounded border-2 border-gray-500 cursor-pointer"
            title="Custom Color"
          />
        </div>
      </div>

      {/* History Section */}
      <div className="mb-4">
        <h3 className="text-white text-sm font-semibold mb-2">History</h3>
        <div className="flex gap-2">
          <button
            onClick={handleUndo}
            disabled={!canUndo}
            className={`px-3 py-2 rounded text-sm transition-colors ${
              canUndo
                ? 'bg-gray-600 text-white hover:bg-gray-500'
                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
            title="Undo (Ctrl+Z)"
          >
            ↶ Undo
          </button>
          <button
            onClick={handleRedo}
            disabled={!canRedo}
            className={`px-3 py-2 rounded text-sm transition-colors ${
              canRedo
                ? 'bg-gray-600 text-white hover:bg-gray-500'
                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
            title="Redo (Ctrl+Y)"
          >
            ↷ Redo
          </button>
        </div>
      </div>

      {/* Selection Section */}
      {selectedShape && (
        <div className="mb-4">
          <h3 className="text-white text-sm font-semibold mb-2">Selection</h3>
          <div className="flex gap-2">
            <button
              onClick={handleDeleteSelected}
              className="px-3 py-2 rounded text-sm bg-red-600 text-white hover:bg-red-500 transition-colors"
              title="Delete Selected (Delete/Backspace)"
            >
              🗑 Delete
            </button>
            <div className="text-xs text-gray-300 px-2 py-2">
              {selectedShape.type} selected
            </div>
          </div>
        </div>
      )}

      {/* Zoom Section */}
      <div className="mb-4">
        <h3 className="text-white text-sm font-semibold mb-2">View</h3>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={handleZoomIn}
            className="p-1 h-10 w-10 flex justify-center items-center rounded text-sm bg-gray-600 text-white hover:bg-gray-500 transition-colors"
            title="Zoom In"
          >
            <ZoomIn size={20} />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-1 h-10 w-10 flex justify-center items-center rounded text-sm bg-gray-600 text-white hover:bg-gray-500 transition-colors"
            title="Zoom Out"
          >
            <ZoomOut size={20} />
          </button>
          <button
            onClick={handleResetZoom}
            className="p-1 h-10 w-20 flex justify-center items-center gap-2 rounded text-sm bg-gray-600 text-white hover:bg-gray-500 transition-colors"
            title="Reset Zoom (Ctrl+0)"
          >
            <RefreshCcw size={10} /> Reset 
          </button>
        </div>
        <div className="text-xs text-gray-400 mt-1">
          Zoom: {Math.round(viewportInfo.scale * 100)}%
        </div>
      </div>

      {/* Export/Import Section */}
      <div className="mb-4">
        <h3 className="text-white text-sm font-semibold mb-2">File</h3>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={handleExportJSON}
            className="px-2 py-1 rounded text-xs bg-green-600 text-white hover:bg-green-500 transition-colors"
            title="Export as JSON (Ctrl+S)"
          >
            💾 JSON
          </button>
          <button
            onClick={handleExportPNG}
            className="px-2 py-1 rounded text-xs bg-blue-600 text-white hover:bg-blue-500 transition-colors"
            title="Export as PNG"
          >
            🖼 PNG
          </button>
          <button
            onClick={handleImport}
            className="px-2 py-1 rounded text-xs bg-purple-600 text-white hover:bg-purple-500 transition-colors"
            title="Import JSON"
          >
            📁 Import
          </button>
          <button
            onClick={handleClear}
            className="px-2 py-1 rounded text-xs bg-red-600 text-white hover:bg-red-500 transition-colors"
            title="Clear Canvas"
          >
            🗑 Clear
          </button>
        </div>
      </div>

      {/* Hidden file input for import */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileImport}
        className="hidden"
      />

      {/* Keyboard Shortcuts Info */}
      <div className="text-xs text-gray-400 border-t border-gray-600 pt-2">
        <div className="font-semibold mb-1">Shortcuts:</div>
        <div>Ctrl+Z: Undo | Ctrl+Y: Redo</div>
        <div>Ctrl+S: Export | Ctrl+0: Reset Zoom</div>
        <div>Delete: Remove Selected</div>
        <div>Ctrl+Click: Pan | Wheel: Zoom</div>
        <div>Esc: Deselect</div>
      </div>
    </div>
  );
}
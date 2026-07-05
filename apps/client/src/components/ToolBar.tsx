import React, { useRef, useState, useEffect } from 'react';
import { Game, Tool } from '@/draw/Game';
import {
  ALargeSmall,
  Circle,
  Diamond,
  Download,
  FileJson,
  FolderOpen,
  MousePointer,
  Pencil,
  RectangleHorizontal,
  RefreshCcw,
  Trash2,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';

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
  { id: 'select' as Tool, label: 'Select', icon: <MousePointer size={16} /> },
  { id: 'rect' as Tool, label: 'Rectangle', icon: <RectangleHorizontal size={16} /> },
  { id: 'circle' as Tool, label: 'Circle', icon: <Circle size={16} /> },
  { id: 'diamond' as Tool, label: 'Diamond', icon: <Diamond size={16} /> },
  { id: 'text' as Tool, label: 'Text', icon: <ALargeSmall size={16} /> },
  { id: 'pencil' as Tool, label: 'Pencil', icon: <Pencil size={16} /> },
];

const sectionLabelClass = 'text-xs font-medium text-(--color-ink-muted) uppercase tracking-wide mb-2';

export function EnhancedToolbar({
  currShape,
  setCurrShape,
  currColor,
  setCurrColor,
  gameRef,
}: ToolbarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);

  useEffect(() => {
    const updateState = () => {
      if (gameRef.current) {
        setCanUndo(gameRef.current.canUndo());
        setCanRedo(gameRef.current.canRedo());
        const viewportInfo = gameRef.current.getViewportInfo();
        setZoomLevel(Math.round(viewportInfo.scale * 100));
      }
    };

    updateState();
    const interval = setInterval(updateState, 100);
    return () => clearInterval(interval);
  }, [gameRef]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleUndo = () => {
    if (gameRef.current?.undo()) {
      setCanUndo(gameRef.current.canUndo());
      setCanRedo(gameRef.current.canRedo());
    }
  };

  const handleRedo = () => {
    if (gameRef.current?.redo()) {
      setCanUndo(gameRef.current.canUndo());
      setCanRedo(gameRef.current.canRedo());
    }
  };

  const handleClear = () => {
    if (window.confirm('Clear the entire canvas? This can’t be undone.')) {
      gameRef.current?.clearAllShapes();
    }
  };

  const handleZoomIn = () => {
    gameRef.current?.zoomIn();
    const viewportInfo = gameRef.current?.getViewportInfo();
    if (viewportInfo) setZoomLevel(Math.round(viewportInfo.scale * 100));
  };

  const handleZoomOut = () => {
    gameRef.current?.zoomOut();
    const viewportInfo = gameRef.current?.getViewportInfo();
    if (viewportInfo) setZoomLevel(Math.round(viewportInfo.scale * 100));
  };

  const handleResetZoom = () => {
    gameRef.current?.resetZoom();
    setZoomLevel(100);
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
      gameRef.current?.importCanvas(content);
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const handleDeleteSelected = () => {
    gameRef.current?.deleteSelectedShape();
  };

  const selectedShape = gameRef.current?.getSelectedShape();

  return (
    <div
      className="fixed top-4 left-4 z-10 bg-(--color-surface-recessed) border border-(--color-line) rounded-lg p-4 shadow-lg max-h-[calc(100vh-2rem)] overflow-y-auto w-64"
      onMouseDown={handleMouseDown}
    >
      <div className="mb-5">
        <h3 className={sectionLabelClass}>Tools</h3>
        <div className="flex gap-1.5 flex-wrap">
          {TOOLS.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setCurrShape(tool.id)}
              className={`p-2 rounded-md transition-colors ${
                currShape === tool.id
                  ? 'bg-(--color-accent) text-(--color-bg)'
                  : 'bg-(--color-surface) text-(--color-ink-muted) hover:text-(--color-ink)'
              }`}
              title={tool.label}
              aria-pressed={currShape === tool.id}
            >
              {tool.icon}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-5">
        <h3 className={sectionLabelClass}>Color</h3>
        <div className="grid grid-cols-6 gap-1.5">
          {COLORS.map((color) => (
            <button
              key={color}
              onClick={() => setCurrColor(color)}
              className={`w-6 h-6 rounded border-2 transition-colors ${
                currColor === color ? 'border-(--color-accent)' : 'border-(--color-line)'
              }`}
              style={{ backgroundColor: color }}
              title={color}
              aria-label={`Color ${color}`}
              aria-pressed={currColor === color}
            />
          ))}
          <input
            type="color"
            value={currColor}
            onChange={(e) => setCurrColor(e.target.value)}
            className="w-6 h-6 rounded border-2 border-(--color-line) cursor-pointer bg-transparent"
            title="Custom color"
          />
        </div>
      </div>

      <div className="mb-5">
        <h3 className={sectionLabelClass}>History</h3>
        <div className="flex gap-2">
          <button
            onClick={handleUndo}
            disabled={!canUndo}
            className="flex-1 px-2 py-1.5 rounded-md text-sm bg-(--color-surface) text-(--color-ink) hover:bg-(--color-line) transition-colors disabled:text-(--color-ink-muted) disabled:hover:bg-(--color-surface) disabled:cursor-not-allowed"
          >
            Undo
          </button>
          <button
            onClick={handleRedo}
            disabled={!canRedo}
            className="flex-1 px-2 py-1.5 rounded-md text-sm bg-(--color-surface) text-(--color-ink) hover:bg-(--color-line) transition-colors disabled:text-(--color-ink-muted) disabled:hover:bg-(--color-surface) disabled:cursor-not-allowed"
          >
            Redo
          </button>
        </div>
      </div>

      {selectedShape && (
        <div className="mb-5">
          <h3 className={sectionLabelClass}>Selection</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDeleteSelected}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-sm bg-(--color-pen-coral) text-(--color-bg) hover:brightness-110 transition-[filter]"
            >
              <Trash2 size={14} />
              Delete
            </button>
            <span className="text-xs text-(--color-ink-muted)">{selectedShape.type}</span>
          </div>
        </div>
      )}

      <div className="mb-5">
        <h3 className={sectionLabelClass}>View</h3>
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleZoomIn}
            className="p-1.5 rounded-md bg-(--color-surface) text-(--color-ink) hover:bg-(--color-line) transition-colors"
            title="Zoom in"
          >
            <ZoomIn size={16} />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-1.5 rounded-md bg-(--color-surface) text-(--color-ink) hover:bg-(--color-line) transition-colors"
            title="Zoom out"
          >
            <ZoomOut size={16} />
          </button>
          <button
            onClick={handleResetZoom}
            className="flex items-center gap-1 px-2 py-1.5 rounded-md text-xs bg-(--color-surface) text-(--color-ink) hover:bg-(--color-line) transition-colors"
            title="Reset zoom (Ctrl+0)"
          >
            <RefreshCcw size={12} />
            Reset
          </button>
          <span className="ml-auto font-(family-name:--font-mono-readout) text-xs text-(--color-ink-muted)">
            {zoomLevel}%
          </span>
        </div>
      </div>

      <div className="mb-4">
        <h3 className={sectionLabelClass}>File</h3>
        <div className="grid grid-cols-2 gap-1.5">
          <button
            onClick={handleExportJSON}
            className="flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-md text-xs bg-(--color-surface) text-(--color-ink) hover:bg-(--color-line) transition-colors"
            title="Export as JSON (Ctrl+S)"
          >
            <FileJson size={13} />
            JSON
          </button>
          <button
            onClick={handleExportPNG}
            className="flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-md text-xs bg-(--color-surface) text-(--color-ink) hover:bg-(--color-line) transition-colors"
            title="Export as PNG"
          >
            <Download size={13} />
            PNG
          </button>
          <button
            onClick={handleImport}
            className="flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-md text-xs bg-(--color-surface) text-(--color-ink) hover:bg-(--color-line) transition-colors"
            title="Import JSON"
          >
            <FolderOpen size={13} />
            Import
          </button>
          <button
            onClick={handleClear}
            className="flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-md text-xs bg-(--color-pen-coral) text-(--color-bg) hover:brightness-110 transition-[filter]"
            title="Clear canvas"
          >
            <Trash2 size={13} />
            Clear
          </button>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileImport}
        className="hidden"
      />

      <div className="text-xs text-(--color-ink-muted) border-t border-(--color-line) pt-3 space-y-0.5">
        <div className="font-medium text-(--color-ink) mb-1">Shortcuts</div>
        <div>Ctrl+Z undo · Ctrl+Y redo</div>
        <div>Ctrl+S export · Ctrl+0 reset zoom</div>
        <div>Delete removes selected · Esc deselects</div>
        <div>Ctrl+click pans · wheel zooms</div>
      </div>
    </div>
  );
}

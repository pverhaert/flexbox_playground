import React, { useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { useFlexbox, defaultItemStyle } from '../context/FlexContext';
import { flexDefinitions } from '../data/flexboxData';
import { X, GripHorizontal, ChevronDown, ChevronUp, TriangleAlert, RotateCcw } from 'lucide-react';
import type { AlignSelf } from '../types';
import { ResizableBox } from 'react-resizable';
import { ResizeHandle } from './ResizeHandle';

interface InfoPanelProps {
    zIndex?: number;
    onFocus?: () => void;
}

export const InfoPanel: React.FC<InfoPanelProps> = ({ zIndex = 50, onFocus }) => {
    const { selectedItemId, items, updateItem, setSelection, containerStyle } = useFlexbox();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const nodeRef = useRef(null);

    // Only show if an item is selected
    if (!selectedItemId) return null;

    const selectedItem = items.find((i: import('../types').FlexItem) => i.id === selectedItemId);
    if (!selectedItem) return null;

    return (
        <Draggable nodeRef={nodeRef} handle=".drag-handle" bounds="parent" onStart={onFocus}>
            <div
                ref={nodeRef}
                style={{ zIndex }}
                onMouseDownCapture={onFocus}
                className="absolute top-20 right-20"
                onClick={(e) => e.stopPropagation()}
            >
                <ResizableBox
                    width={320}
                    height={isCollapsed ? 50 : 550}
                    minConstraints={[250, isCollapsed ? 50 : 200]}
                    maxConstraints={[400, 800]}
                    className={`bg-orange-50/90 dark:bg-neutral-900/95 backdrop-blur-sm rounded-xl shadow-2xl border border-orange-200 dark:border-neutral-700 overflow-hidden relative flex flex-col transition-none`}
                    resizeHandles={['se']}
                    handle={
                        <span className="custom-handle absolute bottom-0 right-0 w-5 h-5 cursor-se-resize z-20 flex items-center justify-center">
                            <ResizeHandle className="text-neutral-400 dark:text-neutral-500 w-3 h-3" />
                        </span>
                    }
                >
                    <>
                        {/* Header / Drag Handle */}
                        <div className="drag-handle bg-orange-200 dark:bg-orange-900/50 p-3 border-b border-orange-300 dark:border-orange-800 cursor-move flex items-center justify-between group shrink-0">
                            <div className="flex items-center gap-2 text-neutral-600 dark:text-orange-100 font-semibold text-sm">
                                <GripHorizontal size={14} />
                                <span>Inspector: Item {selectedItem.text}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => updateItem(selectedItem.id, { ...defaultItemStyle, width: undefined, height: undefined })}
                                    className="text-neutral-500 dark:text-neutral-400 hover:text-orange-700 dark:hover:text-orange-300 p-1 rounded-md hover:bg-orange-300/50 dark:hover:bg-orange-700/50 mr-1"
                                    title="Reset Item to Defaults"
                                >
                                    <RotateCcw size={14} />
                                </button>
                                <button
                                    onClick={() => setIsCollapsed(!isCollapsed)}
                                    className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 p-1 rounded-md hover:bg-orange-300/50 dark:hover:bg-orange-700/50"
                                >
                                    {isCollapsed ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
                                </button>
                                <button
                                    onClick={() => setSelection(null)}
                                    className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 p-1 rounded-md hover:bg-orange-300/50 dark:hover:bg-orange-700/50"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        {!isCollapsed && (
                            <div className="p-4 space-y-4 overflow-y-auto custom-scrollbar flex-1 relative h-full">

                                {/* Size Readout */}
                                {(() => {
                                    const isFlexBasisActive = selectedItem.style.flexBasis && selectedItem.style.flexBasis !== 'auto';
                                    const isColumn = containerStyle.flexDirection.includes('column');
                                    const widthOverridden = isFlexBasisActive && !isColumn;
                                    const heightOverridden = isFlexBasisActive && isColumn;
                                    return (
                                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-3 text-xs text-blue-800 dark:text-blue-200">
                                            <div className="flex justify-between items-center">
                                                <span className={widthOverridden ? 'line-through text-red-500 dark:text-red-400' : ''}>
                                                    Width: <strong>{selectedItem.style.width || 'auto'}</strong>
                                                </span>
                                                <span className={heightOverridden ? 'line-through text-red-500 dark:text-red-400' : ''}>
                                                    Height: <strong>{selectedItem.style.height || 'auto'}</strong>
                                                </span>
                                                <button
                                                    onClick={() => updateItem(selectedItem.id, { width: undefined, height: undefined })}
                                                    className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 p-1 rounded-md hover:bg-blue-100 dark:hover:bg-blue-800/50"
                                                    title="Reset Width & Height"
                                                >
                                                    <RotateCcw size={12} />
                                                </button>
                                            </div>
                                            {(widthOverridden || heightOverridden) && (
                                                <p className="text-[10px] text-neutral-500 dark:text-neutral-400 mt-2">
                                                    {widthOverridden ? 'Width' : 'Height'} is overridden by flex-basis ({selectedItem.style.flexBasis}) in {isColumn ? 'column' : 'row'} mode.
                                                </p>
                                            )}
                                        </div>
                                    );
                                })()}

                                <div className="space-y-4">

                                    {/* Flex Grow */}
                                    <div className="space-y-1">
                                        <div className="flex justify-between items-center">
                                            <label className="text-xs font-bold text-orange-700 dark:text-orange-400 uppercase tracking-wider">flex-grow</label>
                                            <input
                                                type="number"
                                                min="0"
                                                className="w-16 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded px-2 py-1 text-right text-sm text-neutral-900 dark:text-neutral-100 focus:border-blue-500 dark:focus:border-blue-400 outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400"
                                                value={selectedItem.style.flexGrow}
                                                onChange={(e) => updateItem(selectedItem.id, { flexGrow: parseFloat(e.target.value) || 0 })}
                                            />
                                        </div>
                                        <p className="text-[10px] text-neutral-400 dark:text-neutral-500">Controls how much the item grows compared to others.</p>
                                        <div className="text-xs text-red-500 dark:text-red-400 mt-1 flex items-start gap-1">
                                            <TriangleAlert size={12} className="shrink-0 mt-0.5" />
                                            <span>Overrides justify-content</span>
                                        </div>
                                    </div>

                                    {/* Flex Shrink */}
                                    <div className="space-y-1">
                                        <div className="flex justify-between items-center">
                                            <label className="text-xs font-bold text-orange-700 dark:text-orange-400 uppercase tracking-wider">flex-shrink</label>
                                            <input
                                                type="number"
                                                min="0"
                                                className="w-16 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded px-2 py-1 text-right text-sm text-neutral-900 dark:text-neutral-100 focus:border-blue-500 dark:focus:border-blue-400 outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400"
                                                value={selectedItem.style.flexShrink}
                                                onChange={(e) => updateItem(selectedItem.id, { flexShrink: parseFloat(e.target.value) || 0 })}
                                            />
                                        </div>
                                        <p className="text-[10px] text-neutral-400 dark:text-neutral-500">Controls how much the item shrinks when space is limited.</p>
                                        <div className="text-xs text-red-500 dark:text-red-400 mt-1 flex items-start gap-1">
                                            <TriangleAlert size={12} className="shrink-0 mt-0.5" />
                                            <span>Needs min-width: 0 to shrink past content</span>
                                        </div>
                                    </div>

                                    {/* Flex Basis */}
                                    <div className="space-y-1">
                                        <div className="flex justify-between items-center">
                                            <label className="text-xs font-bold text-orange-700 dark:text-orange-400 uppercase tracking-wider">flex-basis</label>
                                            <div className="flex items-center gap-1">
                                                <input
                                                    type="text"
                                                    className="w-24 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded px-2 py-1 text-right text-sm text-neutral-900 dark:text-neutral-100 focus:border-blue-500 dark:focus:border-blue-400 outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400"
                                                    value={selectedItem.style.flexBasis}
                                                    onChange={(e) => updateItem(selectedItem.id, { flexBasis: e.target.value })}
                                                />
                                                <button
                                                    onClick={() => updateItem(selectedItem.id, { flexBasis: defaultItemStyle.flexBasis })}
                                                    className="text-neutral-400 dark:text-neutral-500 hover:text-orange-600 dark:hover:text-orange-400 p-1 rounded-md hover:bg-orange-100 dark:hover:bg-orange-900/30"
                                                    title="Reset flex-basis"
                                                >
                                                    <RotateCcw size={12} />
                                                </button>
                                            </div>
                                        </div>
                                        <p className="text-[10px] text-neutral-400 dark:text-neutral-500 mt-1">
                                            {containerStyle.flexDirection.includes('column') ? 'Acts as Height in Column mode' : 'Acts as Width in Row mode'}
                                        </p>
                                        {(selectedItem.style.flexGrow !== defaultItemStyle.flexGrow ||
                                          selectedItem.style.flexShrink !== defaultItemStyle.flexShrink ||
                                          selectedItem.style.flexBasis !== defaultItemStyle.flexBasis) && (
                                            <div className="bg-orange-100 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800 rounded-md p-2 mt-2">
                                                <p className="text-[10px] text-orange-700 dark:text-orange-400 font-mono">
                                                    flex: {selectedItem.style.flexGrow} {selectedItem.style.flexShrink} {selectedItem.style.flexBasis};
                                                </p>
                                                <p className="text-[10px] text-neutral-500 dark:text-neutral-400 mt-1">Shorthand for flex-grow, flex-shrink, flex-basis.</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Order */}
                                    <div className="space-y-1">
                                        <div className="flex justify-between items-center">
                                            <label className="text-xs font-bold text-orange-700 dark:text-orange-400 uppercase tracking-wider">order</label>
                                            <input
                                                type="number"
                                                className="w-16 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded px-2 py-1 text-right text-sm text-neutral-900 dark:text-neutral-100 focus:border-blue-500 dark:focus:border-blue-400 outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400"
                                                value={selectedItem.style.order}
                                                onChange={(e) => updateItem(selectedItem.id, { order: parseInt(e.target.value) || 0 })}
                                            />
                                        </div>
                                    </div>

                                    {/* Align Self */}
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-orange-700 dark:text-orange-400 uppercase tracking-wider block mb-1">align-self</label>
                                        <select
                                            className="w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded px-2 py-1.5 text-sm text-neutral-700 dark:text-neutral-200 focus:border-blue-500 dark:focus:border-blue-400 outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400"
                                            value={selectedItem.style.alignSelf}
                                            onChange={(e) => updateItem(selectedItem.id, { alignSelf: e.target.value as AlignSelf })}
                                        >
                                            {flexDefinitions.alignSelf.options.map(opt => (
                                                <option key={opt} value={opt}>
                                                    {opt} {opt === defaultItemStyle.alignSelf ? '(default)' : ''}
                                                </option>
                                            ))}
                                        </select>
                                        <p className="text-[10px] text-neutral-400 dark:text-neutral-500 mt-1">{flexDefinitions.alignSelf.description}</p>
                                        <div className="text-xs text-red-500 dark:text-red-400 mt-1 flex items-start gap-1">
                                            <TriangleAlert size={12} className="shrink-0 mt-0.5" />
                                            <span>Overrides align-items</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                </ResizableBox>
            </div>
        </Draggable>
    );
};

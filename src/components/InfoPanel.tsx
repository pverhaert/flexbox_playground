import React, { useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { useFlexbox, defaultItemStyle } from '../context/FlexContext';
import { flexDefinitions } from '../data/flexboxData';
import { X, GripHorizontal, ChevronDown, ChevronUp } from 'lucide-react';
import type { AlignSelf } from '../types';

export const InfoPanel: React.FC = () => {
    const { selectedItemId, items, updateItem, setSelection } = useFlexbox();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const nodeRef = useRef(null);

    // Only show if an item is selected
    if (!selectedItemId) return null;

    const selectedItem = items.find((i: import('../types').FlexItem) => i.id === selectedItemId);
    if (!selectedItem) return null;

    return (
        <Draggable nodeRef={nodeRef} handle=".drag-handle" bounds="parent">
            <div
                ref={nodeRef}
                className="absolute top-20 right-20 w-72 bg-white rounded-xl shadow-2xl border border-neutral-200 z-50 overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header / Drag Handle */}
                <div className="drag-handle bg-neutral-100 p-3 border-b border-neutral-200 cursor-move flex items-center justify-between group">
                    <div className="flex items-center gap-2 text-neutral-600 font-semibold text-sm">
                        <GripHorizontal size={14} />
                        <span>Inspector: Item {selectedItem.text}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            className="text-neutral-400 hover:text-neutral-600 p-1 rounded-md hover:bg-neutral-200"
                        >
                            {isCollapsed ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
                        </button>
                        <button
                            onClick={() => setSelection(null)}
                            className="text-neutral-400 hover:text-neutral-600 p-1 rounded-md hover:bg-neutral-200"
                        >
                            <X size={14} />
                        </button>
                    </div>
                </div>

                {/* Content */}
                {!isCollapsed && (
                    <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">

                        {/* Size Readout */}
                        <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-xs text-blue-800 flex justify-between">
                            <span>Width: <strong>{selectedItem.style.width || 'auto'}</strong></span>
                            <span>Height: <strong>{selectedItem.style.height || 'auto'}</strong></span>
                        </div>

                        <div className="space-y-4">

                            {/* Flex Grow */}
                            <div className="space-y-1">
                                <div className="flex justify-between items-center">
                                    <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Flex Grow</label>
                                    <input
                                        type="number"
                                        min="0"
                                        className="w-16 bg-white border border-neutral-200 rounded px-2 py-1 text-right text-sm focus:border-blue-500 outline-none focus:ring-1 focus:ring-blue-500"
                                        value={selectedItem.style.flexGrow}
                                        onChange={(e) => updateItem(selectedItem.id, { flexGrow: parseFloat(e.target.value) || 0 })}
                                    />
                                </div>
                                <p className="text-[10px] text-neutral-400">Controls how much the item grows compared to others.</p>
                            </div>

                            {/* Flex Shrink */}
                            <div className="space-y-1">
                                <div className="flex justify-between items-center">
                                    <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Flex Shrink</label>
                                    <input
                                        type="number"
                                        min="0"
                                        className="w-16 bg-white border border-neutral-200 rounded px-2 py-1 text-right text-sm focus:border-blue-500 outline-none focus:ring-1 focus:ring-blue-500"
                                        value={selectedItem.style.flexShrink}
                                        onChange={(e) => updateItem(selectedItem.id, { flexShrink: parseFloat(e.target.value) || 0 })}
                                    />
                                </div>
                                <p className="text-[10px] text-neutral-400">Controls how much the item shrinks when space is limited.</p>
                            </div>

                            {/* Order */}
                            <div className="space-y-1">
                                <div className="flex justify-between items-center">
                                    <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Order</label>
                                    <input
                                        type="number"
                                        className="w-16 bg-white border border-neutral-200 rounded px-2 py-1 text-right text-sm focus:border-blue-500 outline-none focus:ring-1 focus:ring-blue-500"
                                        value={selectedItem.style.order}
                                        onChange={(e) => updateItem(selectedItem.id, { order: parseInt(e.target.value) || 0 })}
                                    />
                                </div>
                            </div>

                            {/* Flex Basis */}
                            <div className="space-y-1">
                                <div className="flex justify-between items-center">
                                    <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Flex Basis</label>
                                    <input
                                        type="text"
                                        className="w-24 bg-white border border-neutral-200 rounded px-2 py-1 text-right text-sm focus:border-blue-500 outline-none focus:ring-1 focus:ring-blue-500"
                                        value={selectedItem.style.flexBasis}
                                        onChange={(e) => updateItem(selectedItem.id, { flexBasis: e.target.value })}
                                    />
                                </div>
                            </div>

                            {/* Align Self */}
                            <div className="space-y-1">
                                <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider block mb-1">Align Self</label>
                                <select
                                    className="w-full bg-white border border-neutral-200 rounded px-2 py-1.5 text-sm text-neutral-700 focus:border-blue-500 outline-none focus:ring-1 focus:ring-blue-500"
                                    value={selectedItem.style.alignSelf}
                                    onChange={(e) => updateItem(selectedItem.id, { alignSelf: e.target.value as AlignSelf })}
                                >
                                    {flexDefinitions.alignSelf.options.map(opt => (
                                        <option key={opt} value={opt}>
                                            {opt} {opt === defaultItemStyle.alignSelf ? '(default)' : ''}
                                        </option>
                                    ))}
                                </select>
                                <p className="text-[10px] text-neutral-400 mt-1">{flexDefinitions.alignSelf.description}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Draggable>
    );
};

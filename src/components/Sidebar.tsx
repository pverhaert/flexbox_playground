import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import { useFlexbox, defaultContainerStyle } from '../context/FlexContext';
import { flexDefinitions } from '../data/flexboxData';
import type { FlexDirection, FlexWrap, JustifyContent, AlignItems, AlignContent } from '../types';
import { GripHorizontal, ChevronDown, ChevronUp, TriangleAlert } from 'lucide-react';

export const Sidebar: React.FC = () => {
    const { containerStyle, updateContainerStyle, items } = useFlexbox();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const nodeRef = useRef(null);

    return (
        <Draggable nodeRef={nodeRef} handle=".drag-handle" bounds="parent">
            <div
                ref={nodeRef}
                className="absolute top-4 left-4 w-80 bg-blue-50/90 backdrop-blur-sm rounded-xl shadow-2xl border border-blue-200 z-40 overflow-hidden"
            >
                {/* Header / Drag Handle */}
                <div className="drag-handle bg-neutral-100 p-3 border-b border-neutral-200 cursor-move flex items-center justify-between group">
                    <div className="flex items-center gap-2">
                        <div className="size-6 bg-blue-600 rounded-md flex items-center justify-center">
                            <GripHorizontal size={14} className="text-white" />
                        </div>
                        <h1 className="font-bold text-sm text-neutral-900">Flex Properties</h1>
                    </div>
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="text-neutral-400 hover:text-neutral-600 p-1 rounded-md hover:bg-neutral-200"
                    >
                        {isCollapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
                    </button>
                </div>

                {!isCollapsed && (
                    <>
                        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">

                            {/* Flex Direction */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-blue-700 uppercase tracking-wider">flex-direction</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {flexDefinitions.flexDirection.options.map((option) => (
                                        <button
                                            key={option}
                                            onClick={() => updateContainerStyle({ flexDirection: option as FlexDirection })}
                                            className={`px-3 py-2 text-xs rounded-md border transition-all ${containerStyle.flexDirection === option
                                                ? 'bg-blue-50 border-blue-600 text-blue-600 font-medium'
                                                : 'bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50'
                                                }`}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Flex Wrap */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-blue-700 uppercase tracking-wider">flex-wrap</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {flexDefinitions.flexWrap.options.map((option) => (
                                        <button
                                            key={option}
                                            onClick={() => updateContainerStyle({ flexWrap: option as FlexWrap })}
                                            className={`px-2 py-2 text-xs rounded-md border transition-all ${containerStyle.flexWrap === option
                                                ? 'bg-blue-50 border-blue-600 text-blue-600 font-medium'
                                                : 'bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50'
                                                }`}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Justify Content */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-blue-700 uppercase tracking-wider">justify-content</label>
                                <select
                                    className="w-full bg-white border border-neutral-200 rounded-md px-3 py-2 text-sm text-neutral-700 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                                    value={containerStyle.justifyContent}
                                    onChange={(e) => updateContainerStyle({ justifyContent: e.target.value as JustifyContent })}
                                >
                                    {flexDefinitions.justifyContent.options.map((option) => (
                                        <option key={option} value={option}>
                                            {option} {option === defaultContainerStyle.justifyContent ? '(default)' : ''}
                                        </option>
                                    ))}
                                </select>
                                {items.some(i => i.style.flexGrow > 0) && (
                                    <div className="text-xs text-red-500 mt-1 flex items-start gap-1">
                                        <TriangleAlert size={12} className="shrink-0 mt-0.5" />
                                        <span>May have no effect because items have flex-grow {'>'} 0</span>
                                    </div>
                                )}
                            </div>

                            {/* Align Items */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-blue-700 uppercase tracking-wider">align-items</label>
                                <select
                                    className="w-full bg-white border border-neutral-200 rounded-md px-3 py-2 text-sm text-neutral-700 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                                    value={containerStyle.alignItems}
                                    onChange={(e) => updateContainerStyle({ alignItems: e.target.value as AlignItems })}
                                >
                                    {flexDefinitions.alignItems.options.map((option) => (
                                        <option key={option} value={option}>
                                            {option} {option === defaultContainerStyle.alignItems ? '(default)' : ''}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Align Content */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-blue-700 uppercase tracking-wider">align-content</label>
                                {containerStyle.flexWrap === 'nowrap' && (
                                    <div className="text-xs text-red-500 mt-1 flex items-start gap-1">
                                        <TriangleAlert size={12} className="shrink-0 mt-0.5" />
                                        <span>align-content property has no effect when flex-wrap is 'nowrap'</span>
                                    </div>
                                )}
                                <select
                                    className="w-full bg-white border border-neutral-200 rounded-md px-3 py-2 text-sm text-neutral-700 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                                    value={containerStyle.alignContent}
                                    onChange={(e) => updateContainerStyle({ alignContent: e.target.value as AlignContent })}
                                >
                                    {flexDefinitions.alignContent.options.map((option) => (
                                        <option key={option} value={option}>
                                            {option} {option === defaultContainerStyle.alignContent ? '(default)' : ''}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Gap */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="text-xs font-bold text-blue-700 uppercase tracking-wider">gap</label>
                                    <span className="text-xs text-neutral-500">{containerStyle.gap}rem</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="5"
                                    step="0.25"
                                    value={containerStyle.gap}
                                    onChange={(e) => updateContainerStyle({ gap: parseFloat(e.target.value) })}
                                    className="w-full accent-blue-600"
                                />
                            </div>

                        </div>
                    </>
                )}
            </div>
        </Draggable>
    );
};

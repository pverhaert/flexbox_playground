import React, {useState, useRef} from 'react';
import Draggable from 'react-draggable';
import {useFlexbox, defaultContainerStyle} from '../context/FlexContext';
import {flexDefinitions} from '../data/flexboxData';
import type {FlexDirection, FlexWrap, JustifyContent, AlignItems, AlignContent} from '../types';
import {GripHorizontal, ChevronDown, ChevronUp, TriangleAlert} from 'lucide-react';
import {ResizableBox} from 'react-resizable';
import {ResizeHandle} from './ResizeHandle';

interface SidebarProps {
    zIndex?: number;
    onFocus?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({zIndex = 40, onFocus}) => {
    const {containerStyle, updateContainerStyle, items} = useFlexbox();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const nodeRef = useRef(null);

    return (
        <Draggable nodeRef={nodeRef} handle=".drag-handle" bounds="parent" onStart={onFocus}>
            <div
                ref={nodeRef}
                style={{zIndex}}
                onMouseDownCapture={onFocus}
                className="absolute top-10 left-10"
            >
                <ResizableBox
                    width={320}
                    height={isCollapsed ? 50 : 600}
                    minConstraints={[280, isCollapsed ? 50 : 200]}
                    maxConstraints={[500, 1600]}
                    className={`bg-green-50/90 dark:bg-neutral-900/95 backdrop-blur-sm rounded-xl shadow-2xl border border-green-200 dark:border-neutral-700 overflow-hidden transition-none relative flex flex-col`}
                    resizeHandles={['se']}
                    handle={
                        <span
                            className="custom-handle absolute bottom-0 right-0 w-5 h-5 cursor-se-resize z-20 flex items-center justify-center">
                            <ResizeHandle className="text-neutral-400 dark:text-neutral-500 w-3 h-3"/>
                        </span>
                    }
                >
                    <>
                        {/* Header / Drag Handle */}
                        <div
                            className="drag-handle bg-green-200 dark:bg-green-900/50 p-3 border-b border-green-300 dark:border-green-800 cursor-move flex items-center justify-between group shrink-0">
                            <div
                                className="flex items-center gap-2 text-green-900 dark:text-green-100 font-semibold text-sm">
                                <GripHorizontal size={14}/>
                                <span>Container Inspector</span>
                            </div>
                            <button
                                onClick={() => setIsCollapsed(!isCollapsed)}
                                className="text-green-800 dark:text-green-200 hover:text-green-950 dark:hover:text-white p-1 rounded-md hover:bg-green-300/50 dark:hover:bg-green-700/50"
                            >
                                {isCollapsed ? <ChevronDown size={16}/> : <ChevronUp size={16}/>}
                            </button>
                        </div>

                        {!isCollapsed && (
                            <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar flex-1 relative h-full">

                                {/* Flex Direction */}
                                <div className="space-y-2">
                                    <label
                                        className="text-xs font-bold text-green-700 dark:text-green-400 uppercase tracking-wider">flex-direction</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {flexDefinitions.flexDirection.options.map((option) => (
                                            <button
                                                key={option}
                                                onClick={() => updateContainerStyle({flexDirection: option as FlexDirection})}
                                                className={`px-3 py-2 text-xs rounded-md border transition-all ${containerStyle.flexDirection === option
                                                    ? 'bg-green-50 dark:bg-green-900/40 border-green-600 dark:border-green-500 text-green-600 dark:text-green-300 font-medium'
                                                    : 'bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:border-neutral-300 dark:hover:border-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-700'
                                                }`}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                    <p className="text-[10px] text-neutral-400 dark:text-neutral-500">Defines the
                                        direction flex items are placed in the flex container.</p>
                                </div>

                                {/* Flex Wrap */}
                                <div className="space-y-2">
                                    <label
                                        className="text-xs font-bold text-green-700 dark:text-green-400 uppercase tracking-wider">flex-wrap</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {flexDefinitions.flexWrap.options.map((option) => (
                                            <button
                                                key={option}
                                                onClick={() => updateContainerStyle({flexWrap: option as FlexWrap})}
                                                className={`px-2 py-2 text-xs rounded-md border transition-all ${containerStyle.flexWrap === option
                                                    ? 'bg-green-50 dark:bg-green-900/40 border-green-600 dark:border-green-500 text-green-600 dark:text-green-300 font-medium'
                                                    : 'bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:border-neutral-300 dark:hover:border-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-700'
                                                }`}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                    <p className="text-[10px] text-neutral-400 dark:text-neutral-500">Specifies whether
                                        items should wrap or not.</p>
                                </div>

                                {/* Justify Content */}
                                <div className="space-y-2">
                                    <label
                                        className="text-xs font-bold text-green-700 dark:text-green-400 uppercase tracking-wider">justify-content</label>
                                    <select
                                        className="w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-md px-3 py-2 text-sm text-neutral-700 dark:text-neutral-200 focus:outline-none focus:border-green-600 dark:focus:border-green-500 focus:ring-1 focus:ring-green-600 dark:focus:ring-green-500"
                                        value={containerStyle.justifyContent}
                                        onChange={(e) => updateContainerStyle({justifyContent: e.target.value as JustifyContent})}
                                    >
                                        {flexDefinitions.justifyContent.options.map((option) => (
                                            <option key={option} value={option}>
                                                {option} {option === defaultContainerStyle.justifyContent ? '(default)' : ''}
                                            </option>
                                        ))}
                                    </select>
                                    {items.some(i => i.style.flexGrow > 0) && (
                                        <div
                                            className="text-xs text-red-500 dark:text-red-400 mt-1 flex items-start gap-1">
                                            <TriangleAlert size={12} className="shrink-0 mt-0.5"/>
                                            <span>May have no effect because items have flex-grow {'>'} 0</span>
                                        </div>
                                    )}
                                    <p className="text-[10px] text-neutral-400 dark:text-neutral-500 mt-1">Defines
                                        alignment along the main axis.</p>
                                </div>

                                {/* Align Items */}
                                <div className="space-y-2">
                                    <label
                                        className="text-xs font-bold text-green-700 dark:text-green-400 uppercase tracking-wider">align-items</label>
                                    <select
                                        className="w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-md px-3 py-2 text-sm text-neutral-700 dark:text-neutral-200 focus:outline-none focus:border-green-600 dark:focus:border-green-500 focus:ring-1 focus:ring-green-600 dark:focus:ring-green-500"
                                        value={containerStyle.alignItems}
                                        onChange={(e) => updateContainerStyle({alignItems: e.target.value as AlignItems})}
                                    >
                                        {flexDefinitions.alignItems.options.map((option) => (
                                            <option key={option} value={option}>
                                                {option} {option === defaultContainerStyle.alignItems ? '(default)' : ''}
                                            </option>
                                        ))}
                                    </select>
                                    <p className="text-[10px] text-neutral-400 dark:text-neutral-500 mt-1">Defines the
                                        default behavior for how flex items are laid out along the cross axis.</p>
                                </div>

                                {/* Align Content */}
                                <div className="space-y-2">
                                    <label
                                        className="text-xs font-bold text-green-700 dark:text-green-400 uppercase tracking-wider">align-content</label>
                                    {containerStyle.flexWrap === 'nowrap' && (
                                        <div
                                            className="text-xs text-red-500 dark:text-red-400 mt-1 flex items-start gap-1">
                                            <TriangleAlert size={12} className="shrink-0 mt-0.5"/>
                                            <span>align-content property has no effect when flex-wrap is 'nowrap'</span>
                                        </div>
                                    )}
                                    <select
                                        className="w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-md px-3 py-2 text-sm text-neutral-700 dark:text-neutral-200 focus:outline-none focus:border-green-600 dark:focus:border-green-500 focus:ring-1 focus:ring-green-600 dark:focus:ring-green-500"
                                        value={containerStyle.alignContent}
                                        onChange={(e) => updateContainerStyle({alignContent: e.target.value as AlignContent})}
                                    >
                                        {flexDefinitions.alignContent.options.map((option) => (
                                            <option key={option} value={option}>
                                                {option} {option === defaultContainerStyle.alignContent ? '(default)' : ''}
                                            </option>
                                        ))}
                                    </select>
                                    <p className="text-[10px] text-neutral-400 dark:text-neutral-500 mt-1">Aligns a flex
                                        container's lines within the flex container when there is extra space on the
                                        cross-axis.</p>
                                </div>

                                {/* Row Gap */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <label
                                            className="text-xs font-bold text-green-700 dark:text-green-400 uppercase tracking-wider">row-gap</label>
                                        <span
                                            className="text-xs text-neutral-500 dark:text-neutral-400">{containerStyle.rowGap}rem</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="5"
                                        step="0.25"
                                        value={containerStyle.rowGap}
                                        onChange={(e) => updateContainerStyle({rowGap: parseFloat(e.target.value)})}
                                        className="w-full accent-green-600 dark:accent-green-500"
                                    />
                                    <p className="text-[10px] text-neutral-400 dark:text-neutral-500">Controls the space
                                        between rows.</p>
                                </div>

                                {/* Column Gap */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <label
                                            className="text-xs font-bold text-green-700 dark:text-green-400 uppercase tracking-wider">column-gap</label>
                                        <span
                                            className="text-xs text-neutral-500 dark:text-neutral-400">{containerStyle.columnGap}rem</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="5"
                                        step="0.25"
                                        value={containerStyle.columnGap}
                                        onChange={(e) => updateContainerStyle({columnGap: parseFloat(e.target.value)})}
                                        className="w-full accent-green-600 dark:accent-green-500"
                                    />
                                    <p className="text-[10px] text-neutral-400 dark:text-neutral-500">Controls the space
                                        between columns.</p>
                                    {(containerStyle.rowGap !== 0 || containerStyle.columnGap !== 0) && (
                                        <div
                                            className="bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-md p-2 mt-2">
                                            <p className="text-[10px] text-green-700 dark:text-green-400 font-mono">
                                                {containerStyle.rowGap === containerStyle.columnGap
                                                    ? `gap: ${containerStyle.rowGap}rem;`
                                                    : `gap: ${containerStyle.rowGap}rem ${containerStyle.columnGap}rem;`
                                                }
                                            </p>
                                            <p className="text-[10px] text-neutral-500 dark:text-neutral-400 mt-1">Shorthand
                                                for row-gap and column-gap.</p>
                                        </div>
                                    )}
                                </div>

                            </div>
                        )}
                    </>
                </ResizableBox>
            </div>
        </Draggable>
    );
};

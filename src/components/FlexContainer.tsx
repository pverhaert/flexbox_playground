import React, { useRef } from 'react';
import { ResizableBox } from 'react-resizable';
import Draggable from 'react-draggable';
import { useFlexbox } from '../context/FlexContext';
import { FlexItem as FlexItemComponent } from './FlexItem';
import { Plus, GripHorizontal } from 'lucide-react';
import { ResizeHandle } from './ResizeHandle';

interface FlexContainerProps {
    zIndex?: number;
    onFocus?: () => void;
}

export const FlexContainer: React.FC<FlexContainerProps> = ({ zIndex = 30, onFocus }) => {
    const { containerStyle, items, addItem } = useFlexbox();
    const nodeRef = useRef(null);

    return (
        <div className="flex-1 bg-neutral-100 dark:bg-neutral-900 overflow-hidden flex flex-col items-center justify-center p-8 relative transition-colors duration-300">

            <Draggable nodeRef={nodeRef} handle=".preview-handle" bounds="parent" onStart={onFocus}>
                <div ref={nodeRef} className="inline-block relative" style={{ zIndex }} onMouseDownCapture={onFocus}>
                    <ResizableBox
                        width={600}
                        height={400}
                        minConstraints={[300, 200]}
                        maxConstraints={[1200, 800]}
                        className="relative shadow-xl ring-1 ring-black/5 dark:ring-white/10 rounded-xl bg-green-50 dark:bg-neutral-800 transition-all duration-200 flex flex-col"
                        resizeHandles={['se']}
                        onResizeStart={(e) => {
                            e.stopPropagation();
                        }}
                        handle={
                            <span className="custom-handle absolute bottom-0 right-0 w-6 h-6 cursor-se-resize z-20 flex items-center justify-center">
                                <ResizeHandle className="text-neutral-400" />
                            </span>
                        }
                    >
                        {/* Drag Handle */}
                        <div className="preview-handle h-8 bg-blue-200 dark:bg-blue-900 border-b border-blue-300 dark:border-blue-800 rounded-t-xl cursor-move flex items-center justify-center relative group-header text-neutral-600 dark:text-blue-100 hover:text-neutral-800 dark:hover:text-white hover:bg-blue-300 dark:hover:bg-blue-800 transition-colors">
                            <div className="flex items-center gap-2">
                                <GripHorizontal size={14} />
                                <span className="text-xs font-bold uppercase tracking-wide">Preview</span>
                            </div>

                            {/* Add Item Button (Moved to Header) */}
                            <div className="absolute right-2 top-1/2 -translate-y-1/2">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        addItem();
                                    }}
                                    className="p-1 bg-blue-600 hover:bg-blue-500 text-white rounded shadow-sm transition-transform hover:scale-110 active:scale-95 flex items-center justify-center group/btn relative"
                                    aria-label="Add Flex Item"
                                >
                                    <Plus size={14} />
                                    {/* Tooltip */}
                                    <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-neutral-900 text-white text-[10px] rounded opacity-0 group-hover/btn:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-60">
                                        Add Item
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* Flex Container Content */}
                        <div
                            className="w-full flex-1 relative group transition-colors duration-300 overflow-hidden rounded-b-xl"
                            style={{
                                display: 'flex',
                                flexDirection: containerStyle.flexDirection,
                                flexWrap: containerStyle.flexWrap,
                                justifyContent: containerStyle.justifyContent,
                                alignItems: containerStyle.alignItems,
                                alignContent: containerStyle.alignContent,
                                gap: `${containerStyle.gap}rem`,
                                padding: '1.5rem',
                            }}
                        >
                            {items.map((item) => (
                                <FlexItemComponent key={item.id} item={item} />
                            ))}

                            {/* Empty State */}
                            {items.length === 0 && (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <span className="text-neutral-400 font-medium">No items</span>
                                </div>
                            )}

                        </div>
                    </ResizableBox>
                </div>
            </Draggable>

            <div className="absolute bottom-6 text-neutral-400 dark:text-neutral-500 text-xs text-center w-full pointer-events-none">
                Drag bottom-right corner to resize container or items
            </div>
        </div>
    );
};

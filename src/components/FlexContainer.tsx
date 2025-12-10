import React, { useRef } from 'react';
import { ResizableBox } from 'react-resizable';
import Draggable from 'react-draggable';
import { useFlexbox } from '../context/FlexContext';
import { FlexItem as FlexItemComponent } from './FlexItem';
import { Plus, GripHorizontal } from 'lucide-react';

interface FlexContainerProps {
    zIndex?: number;
    onFocus?: () => void;
}

export const FlexContainer: React.FC<FlexContainerProps> = ({ zIndex = 30, onFocus }) => {
    const { containerStyle, items, addItem } = useFlexbox();
    const nodeRef = useRef(null);

    return (
        <div className="flex-1 bg-neutral-100 overflow-hidden flex flex-col items-center justify-center p-8 relative">

            <Draggable nodeRef={nodeRef} handle=".preview-handle" bounds="parent" onStart={onFocus}>
                <div ref={nodeRef} className="inline-block relative" style={{ zIndex }} onMouseDownCapture={onFocus}>
                    <ResizableBox
                        width={600}
                        height={400}
                        minConstraints={[300, 200]}
                        maxConstraints={[1200, 800]}
                        className="relative shadow-xl ring-1 ring-black/5 rounded-xl bg-green-50 transition-shadow duration-200 flex flex-col"
                        resizeHandles={['se']}
                        onResizeStart={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        {/* Drag Handle */}
                        <div className="preview-handle h-8 bg-blue-200 border-b border-blue-300 rounded-t-xl cursor-move flex items-center justify-center gap-2 text-neutral-600 hover:text-neutral-800 hover:bg-blue-300 transition-colors">
                            <GripHorizontal size={14} />
                            <span className="text-xs font-bold uppercase tracking-wide">Preview</span>
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

                            {/* Empty State / Add Item Overlay */}
                            {items.length === 0 && (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <span className="text-neutral-400 font-medium">No items</span>
                                </div>
                            )}

                            {/* Add Item Overlay (Top Right) */}
                            <div className="absolute top-2 right-2 z-10">
                                <button
                                    onClick={addItem}
                                    className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-full shadow-lg transform transition-transform hover:scale-110 active:scale-95 flex items-center gap-2 font-bold"
                                    aria-label="Add Flex Item"
                                >
                                    <Plus size={18} />
                                </button>
                            </div>

                        </div>
                    </ResizableBox>
                </div>
            </Draggable>

            <div className="absolute bottom-6 text-neutral-400 text-xs">
                Drag bottom-right corner to resize container
            </div>
        </div>
    );
};

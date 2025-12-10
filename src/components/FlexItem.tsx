import React, { useState } from 'react';
import { ResizableBox } from 'react-resizable';
import { Trash2 } from 'lucide-react';
import { useFlexbox } from '../context/FlexContext';
import type { FlexItem as FlexItemType } from '../types';
import { ResizeHandle } from './ResizeHandle';

interface FlexItemProps {
    item: FlexItemType;
}

export const FlexItem: React.FC<FlexItemProps> = ({ item }) => {
    const { removeItem, selectedItemId, setSelection, updateItem, containerStyle } = useFlexbox();
    const [isHovered, setIsHovered] = useState(false);

    // Default size if not specified
    const widthVal = item.style.width ? parseInt(item.style.width) : 100;
    const heightVal = item.style.height ? parseInt(item.style.height) : 100;

    const isSelected = selectedItemId === item.id;
    const isRow = !containerStyle.flexDirection.includes('column');

    // Determine if this item should stretch
    const effectiveAlign = item.style.alignSelf === 'auto' ? containerStyle.alignItems : item.style.alignSelf;
    const shouldStretch = effectiveAlign === 'stretch';

    // Logic for Stretch:
    // Hybrid Approach:
    // 1. Use !important class (h-auto! / w-auto!) to FORCE override the inline height/width from ResizableBox.
    // 2. Use inline style (minHeight / minWidth) to PREVENT collapsing to 0/text-size when wrapped.
    const styleOverrides: React.CSSProperties = {
        alignSelf: item.style.alignSelf,
        order: item.style.order,
        flexGrow: item.style.flexGrow,
        flexShrink: item.style.flexShrink,
        flexBasis: item.style.flexBasis,
    };

    let stretchClass = '';

    if (shouldStretch) {
        if (isRow) {
            // Stretch height
            stretchClass = 'h-auto!';
            styleOverrides.minHeight = `${heightVal}px`;
        } else {
            // Stretch width
            stretchClass = 'w-auto!';
            styleOverrides.minWidth = `${widthVal}px`;
        }
    }

    const handleResizeStop = (_e: any, data: { size: { width: number; height: number } }) => {
        updateItem(item.id, {
            width: `${data.size.width}px`,
            height: `${data.size.height}px`,
        });
    };

    return (
        <ResizableBox
            width={widthVal}
            height={heightVal}
            minConstraints={[50, 50]}
            maxConstraints={[500, 500]}
            onResizeStop={handleResizeStop}
            className={`relative transition-all duration-200 ${stretchClass}`}
            resizeHandles={['se']}
            style={styleOverrides}
            handle={
                <span className={`custom-handle absolute bottom-0 right-0 w-6 h-6 cursor-se-resize z-20 flex items-center justify-center transition-opacity duration-200 ${isHovered || isSelected ? 'opacity-100' : 'opacity-0'}`}>
                    <ResizeHandle className={isSelected ? 'text-blue-500' : 'text-neutral-400'} />
                </span>
            }
        >
            <div
                className={`w-full h-full rounded-lg transition-all duration-200 flex flex-col items-center justify-center relative group select-none border-2 ${isSelected
                    ? 'bg-blue-50 border-blue-500 shadow-[0_0_0_2px_rgba(59,130,246,0.2)]'
                    : 'bg-orange-50 border-neutral-200 hover:border-neutral-300 hover:shadow-md'
                    }`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={(e) => {
                    e.stopPropagation();
                    setSelection(item.id);
                }}
            >
                <span className="text-2xl font-bold opacity-30 group-hover:opacity-100 transition-opacity text-neutral-900">
                    {item.text}
                </span>

                {/* Controls Overlay */}
                <div className={`absolute top-2 right-2 flex gap-1 transition-opacity duration-200 ${isHovered || isSelected ? 'opacity-100' : 'opacity-0'}`}>
                    <button
                        className="p-1.5 bg-white text-neutral-400 hover:text-red-500 rounded-md shadow-sm border border-neutral-200 hover:border-red-200 hover:bg-red-50"
                        title="Delete Item"
                        onClick={(e) => {
                            e.stopPropagation();
                            removeItem(item.id);
                        }}
                    >
                        <Trash2 size={14} />
                    </button>
                </div>

                {/* Info on hover */}
                {!isSelected && (
                    <div className="absolute bottom-2 left-2 text-[10px] text-neutral-400 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                        {shouldStretch
                            ? 'auto'
                            : `${item.style.width || 'auto'} x ${item.style.height || 'auto'}`
                        }
                    </div>
                )}
            </div>
        </ResizableBox >
    );
};

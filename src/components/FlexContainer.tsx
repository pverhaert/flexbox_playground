import React from 'react';
import { ResizableBox } from 'react-resizable';
import { useFlexbox } from '../context/FlexContext';
import { FlexItem as FlexItemComponent } from './FlexItem';
import { Plus } from 'lucide-react';

export const FlexContainer: React.FC = () => {
    const { containerStyle, items, addItem } = useFlexbox();


    return (
        <div className="flex-1 bg-neutral-100 overflow-auto flex flex-col items-center justify-center p-8 relative">
            <div className="text-neutral-500 mb-4 font-medium tracking-wide text-sm opacity-60">
                FLEX CONTAINER
            </div>

            <ResizableBox
                width={600}
                height={400}
                minConstraints={[300, 200]}
                maxConstraints={[1200, 800]}
                className="relative shadow-xl ring-1 ring-black/5 rounded-xl bg-white transition-shadow duration-200"
                resizeHandles={['se']}
                onResizeStart={() => { }}
                onResizeStop={() => { }}
            >
                <div
                    className="w-full h-full relative group transition-colors duration-300"
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
                    <div className="absolute top-4 right-4 z-10">
                        <button
                            onClick={addItem}
                            className="bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-full shadow-lg transform transition-transform hover:scale-110 active:scale-95 flex items-center gap-2 font-bold"
                            aria-label="Add Flex Item"
                        >
                            <Plus size={24} />
                        </button>
                    </div>

                </div>
            </ResizableBox>

            <div className="absolute bottom-6 text-neutral-400 text-xs">
                Drag bottom-right corner to resize container
            </div>
        </div>
    );
};

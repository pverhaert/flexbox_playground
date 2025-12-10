import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { FlexContextType, FlexContainerStyle, FlexItem, FlexItemStyle } from '../types';

export const defaultContainerStyle: FlexContainerStyle = {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    alignContent: 'stretch',
    gap: 1, // 1rem
};

export const defaultItemStyle: FlexItemStyle = {
    alignSelf: 'auto',
    order: 0,
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 'auto',
};

const FlexContext = createContext<FlexContextType | undefined>(undefined);

export const FlexProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [containerStyle, setContainerStyle] = useState<FlexContainerStyle>(defaultContainerStyle);
    const [items, setItems] = useState<FlexItem[]>([
        { id: '1', text: '1', style: { ...defaultItemStyle } },
        { id: '2', text: '2', style: { ...defaultItemStyle } },
        { id: '3', text: '3', style: { ...defaultItemStyle } },
    ]);
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

    const updateContainerStyle = (style: Partial<FlexContainerStyle>) => {
        setContainerStyle((prev: FlexContainerStyle) => ({ ...prev, ...style }));
    };

    const addItem = () => {
        const newId = String(items.length > 0 ? Math.max(...items.map((i: FlexItem) => parseInt(i.id))) + 1 : 1);
        const newItem: FlexItem = {
            id: newId,
            text: newId,
            style: { ...defaultItemStyle },
        };
        setItems((prev: FlexItem[]) => [...prev, newItem]);
    };

    const removeItem = (id: string) => {
        setItems((prev: FlexItem[]) => prev.filter((item: FlexItem) => item.id !== id));
        if (selectedItemId === id) setSelectedItemId(null);
    };

    const updateItem = (id: string, style: Partial<FlexItemStyle>) => {
        setItems((prev: FlexItem[]) =>
            prev.map((item: FlexItem) => (item.id === id ? { ...item, style: { ...item.style, ...style } } : item))
        );
    };

    const setSelection = (id: string | null) => {
        setSelectedItemId(id);
    };

    const resetPlayground = () => {
        setContainerStyle(defaultContainerStyle);
        setItems([
            { id: '1', text: '1', style: { ...defaultItemStyle } },
            { id: '2', text: '2', style: { ...defaultItemStyle } },
            { id: '3', text: '3', style: { ...defaultItemStyle } },
        ]);
    };

    return (
        <FlexContext.Provider
            value={{
                containerStyle,
                items,
                selectedItemId,
                updateContainerStyle,
                addItem,
                removeItem,
                updateItem,
                setSelection,
                resetPlayground,
            }}
        >
            {children}
        </FlexContext.Provider>
    );
};

export const useFlexbox = () => {
    const context = useContext(FlexContext);
    if (context === undefined) {
        throw new Error('useFlexbox must be used within a FlexProvider');
    }
    return context;
};

export type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
export type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';
export type JustifyContent = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
export type AlignItems = 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline';
export type AlignContent = 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
export type AlignSelf = 'auto' | 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline';

export interface FlexContainerStyle {
    flexDirection: FlexDirection;
    flexWrap: FlexWrap;
    justifyContent: JustifyContent;
    alignItems: AlignItems;
    alignContent: AlignContent;
    rowGap: number; // in rem
    columnGap: number; // in rem
}

export interface FlexItemStyle {
    alignSelf: AlignSelf;
    order: number;
    flexGrow: number;
    flexShrink: number;
    flexBasis: string; // "auto", "0", "100px", "50%" etc.
    width?: string;
    height?: string;
}

export interface FlexItem {
    id: string;
    text: string;
    style: FlexItemStyle;
}

export interface FlexContextType {
    containerStyle: FlexContainerStyle;
    items: FlexItem[];
    selectedItemId: string | null;

    // Actions
    updateContainerStyle: (style: Partial<FlexContainerStyle>) => void;
    addItem: () => void;
    removeItem: (id: string) => void;
    updateItem: (id: string, style: Partial<FlexItemStyle>) => void;
    setSelection: (id: string | null) => void;
    resetPlayground: () => void;
}

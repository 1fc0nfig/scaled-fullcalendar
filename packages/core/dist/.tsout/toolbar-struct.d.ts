export interface ToolbarModel {
    sectionWidgets: {
        [sectionName: string]: ToolbarWidget[][];
    };
    viewsWithButtons: string[];
    hasTitle: boolean;
}
export interface ToolbarWidget {
    buttonName: string;
    buttonClick?: any;
    buttonIcon?: any;
    buttonText?: any;
    buttonHint?: string | ((navUnit: string) => string);
}
export interface ToolbarInput {
    left?: string;
    center?: string;
    right?: string;
    start?: string;
    end?: string;
}
export interface CustomButtonInput {
    text?: string;
    hint?: string;
    icon?: string;
    themeIcon?: string;
    bootstrapFontAwesome?: string;
    click?(ev: MouseEvent, element: HTMLElement): void;
}
export interface ButtonIconsInput {
    prev?: string;
    next?: string;
    prevYear?: string;
    nextYear?: string;
    today?: string;
    [viewOrCustomButton: string]: string | undefined;
}
export interface ButtonTextCompoundInput {
    prev?: string;
    next?: string;
    prevYear?: string;
    nextYear?: string;
    today?: string;
    month?: string;
    week?: string;
    day?: string;
    [viewOrCustomButton: string]: string | undefined;
}
export interface ButtonHintCompoundInput {
    prev?: string | ((...args: any[]) => string);
    next?: string | ((...args: any[]) => string);
    prevYear?: string | ((...args: any[]) => string);
    nextYear?: string | ((...args: any[]) => string);
    today?: string | ((...args: any[]) => string);
    month?: string | ((...args: any[]) => string);
    week?: string | ((...args: any[]) => string);
    day?: string | ((...args: any[]) => string);
    [viewOrCustomButton: string]: string | ((...args: any[]) => string) | undefined;
}
//# sourceMappingURL=toolbar-struct.d.ts.map
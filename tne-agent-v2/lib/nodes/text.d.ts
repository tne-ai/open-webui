export type TextNodeData = {
    id: string;
    title: string;
    value: string;
    update?: string;
};
export declare const textAgentDefaultValue: TextNodeData;
export declare const initTextAgent: (id: string) => TextNodeData;
export declare const updateTextAgent: (id: string, title: string, value: string, update?: string) => TextNodeData;

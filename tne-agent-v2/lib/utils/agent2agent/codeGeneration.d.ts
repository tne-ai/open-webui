import { ComputedNodeData } from "graphai";
import { CodeGenerationReactFlowNode, NodeTypePythonCode } from "../../types";
export declare const codeGenerationAgent: (node: CodeGenerationReactFlowNode, llmAgentBase: ComputedNodeData) => {
    agent: string;
    params: {
        useUserQuery: boolean;
    };
    graph: {
        version: number;
        nodes: {
            [x: string]: {
                agent: string;
                params: {
                    prompt: string;
                };
                passThrough: {
                    nodeType: string;
                    nodeId: string;
                    nodeTitle: string;
                };
                inputs: {
                    file: string;
                    inputs: string;
                    userPrompt: string;
                    prompt?: undefined;
                    model?: undefined;
                    system?: undefined;
                    temperature?: undefined;
                    max_tokens?: undefined;
                    code?: undefined;
                };
            } | {
                inputs: {
                    prompt: string;
                    model: string;
                    system: string;
                    temperature: string;
                    max_tokens: string;
                    file?: undefined;
                    inputs?: undefined;
                    userPrompt?: undefined;
                    code?: undefined;
                };
                agent: string | import("graphai/lib/type").AgentAnonymousFunction;
                anyInput?: boolean;
                params?: import("graphai/lib/type").NodeDataParams;
                filterParams?: import("graphai/lib/type").AgentFilterParams;
                retry?: number;
                timeout?: number;
                if?: string;
                unless?: string;
                graph?: import("graphai").GraphData | string;
                isResult?: boolean;
                priority?: number;
                passThrough?: import("graphai/lib/type").PassThrough;
                console?: Record<string, string | boolean>;
            } | {
                params: {
                    prompt?: undefined;
                };
                inputs: {
                    code: string;
                    file?: undefined;
                    inputs?: undefined;
                    userPrompt?: undefined;
                    prompt?: undefined;
                    model?: undefined;
                    system?: undefined;
                    temperature?: undefined;
                    max_tokens?: undefined;
                };
                agent: "pythonCodeAgent";
                passThrough: {
                    nodeType: typeof NodeTypePythonCode;
                    nodeId: string;
                    nodeTitle: string;
                };
                isResult: boolean;
            };
        };
    };
    passThrough: {
        nodeType: typeof import("../../types").NodeTypeCodeGeneration;
        nodeId: string;
        nodeTitle: string;
    };
    isResult: boolean;
};

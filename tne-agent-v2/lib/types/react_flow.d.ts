import { NodeData } from "graphai";
import { CodeGenerationNodeData, LLMNodeData, ProcNodeData, PythonCodeNodeData, TextNodeData } from "../nodes";
export type ReactFlowNodeBase = {
    id: string;
};
export declare const NodeTypeCodeGeneration = "code_generation";
export declare const NodeTypeLLM = "llm";
export declare const NodeTypeLLMImage = "llm_image";
export declare const NodeTypeDebug = "debug";
export declare const NodeTypeRAG = "rag";
export declare const NodeTypeFile = "file";
export declare const NodeTypePythonCode = "python_code";
export declare const NodeTypeDatabase = "database";
export declare const NodeTypeOut = "out";
export declare const NodeTypeNested = "nested";
export declare const NodeTypeSemantic = "semantic";
export declare const NodeTypeText = "text";
export declare const NodeTypeCodeGenerationTemplate = "codeGeneration_template";
export type SourceTypes = typeof NodeTypeCodeGeneration | typeof NodeTypeLLM | typeof NodeTypeLLMImage | typeof NodeTypeDebug | typeof NodeTypeRAG | typeof NodeTypeFile | typeof NodeTypePythonCode | typeof NodeTypeDatabase | typeof NodeTypeOut | typeof NodeTypeNested | typeof NodeTypeSemantic | typeof NodeTypeText;
export type LLMReactFlowNode = {
    type: typeof NodeTypeLLM;
    data: LLMNodeData;
} & ReactFlowNodeBase;
export type CodeGenerationReactFlowNode = {
    type: typeof NodeTypeCodeGeneration;
    data: CodeGenerationNodeData;
} & ReactFlowNodeBase;
export type ExpertReactFlowNode = {
    type: typeof NodeTypeNested;
    data: ProcNodeData;
} & ReactFlowNodeBase;
export type PythonCodeReactFlowNode = {
    type: typeof NodeTypePythonCode;
    data: PythonCodeNodeData;
} & ReactFlowNodeBase;
export type TextNodeReactFlowNode = {
    type: typeof NodeTypeText;
    data: TextNodeData;
} & ReactFlowNodeBase;
export type AgentReactFlowNode = CodeGenerationReactFlowNode | LLMReactFlowNode | ExpertReactFlowNode | PythonCodeReactFlowNode | TextNodeReactFlowNode;
export type AgentReactFlowNodeDict = Record<string, AgentReactFlowNode>;
export type ReactFlowGraphAIData = NodeData & {
    id: string;
};
type ReactFlowHandle = "r" | "l" | "t";
export type ReactFlowEdge = {
    id: string;
    source: string;
    sourceHandle: ReactFlowHandle;
    target: string;
    targetHandle: ReactFlowHandle;
};
export type ReactFlowData = {
    nodes: AgentReactFlowNode[];
    edges: ReactFlowEdge[];
};
export type EdgeInput = Record<string, ReactFlowEdge[]>;
export type EdgeInternalData = Record<string, EdgeInput>;
export interface GitHubContent {
    name: string;
    path: string;
    sha: string;
    size: number;
    url: string;
    html_url: string;
    git_url: string;
    download_url: string;
    type: string;
}
export type StateFlowState = {
    backend?: string;
    content?: GitHubContent;
    repo: string;
};
export {};

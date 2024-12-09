import { NodeData } from "graphai";
import { CodeGenerationNodeData, LLMNodeData, ProcNodeData, PythonCodeNodeData, TextNodeData } from "../nodes";

// Node
export type ReactFlowNodeBase = {
  id: string;
};

export const NodeTypeCodeGeneration = "code_generation";
export const NodeTypeLLM = "llm";
export const NodeTypeLLMImage = "llm_image"; // this is virtual. Just use input.ts  not set passthrough.
export const NodeTypeDebug = "debug";
export const NodeTypeRAG = "rag";
export const NodeTypeFile = "file";
export const NodeTypePythonCode = "python_code";
export const NodeTypeDatabase = "database";
export const NodeTypeOut = "out";
export const NodeTypeNested = "nested";
export const NodeTypeSemantic = "semantic";
export const NodeTypeText = "text";

export const NodeTypeCodeGenerationTemplate = "codeGeneration_template";

export type SourceTypes =
  | typeof NodeTypeCodeGeneration
  | typeof NodeTypeLLM
  | typeof NodeTypeLLMImage
  | typeof NodeTypeDebug
  | typeof NodeTypeRAG
  | typeof NodeTypeFile
  | typeof NodeTypePythonCode
  | typeof NodeTypeDatabase
  | typeof NodeTypeOut
  | typeof NodeTypeNested
  | typeof NodeTypeSemantic
  | typeof NodeTypeText;

// Data that needs to be converted from agent to agent
export type LLMReactFlowNode = { type: typeof NodeTypeLLM; data: LLMNodeData } & ReactFlowNodeBase;
export type CodeGenerationReactFlowNode = { type: typeof NodeTypeCodeGeneration; data: CodeGenerationNodeData } & ReactFlowNodeBase;
export type ExpertReactFlowNode = { type: typeof NodeTypeNested; data: ProcNodeData } & ReactFlowNodeBase;
export type PythonCodeReactFlowNode = { type: typeof NodeTypePythonCode; data: PythonCodeNodeData } & ReactFlowNodeBase;

export type TextNodeReactFlowNode = { type: typeof NodeTypeText; data: TextNodeData } & ReactFlowNodeBase;
export type AgentReactFlowNode = CodeGenerationReactFlowNode | LLMReactFlowNode | ExpertReactFlowNode | PythonCodeReactFlowNode | TextNodeReactFlowNode;

export type AgentReactFlowNodeDict = Record<string, AgentReactFlowNode>;

// for studio
export type ReactFlowGraphAIData = NodeData & { id: string };

// Edge
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

import { ComputedNodeData } from "graphai";
import { NodeTypeCodeGeneration, ReactFlowNodeBase } from "../types";
export type CodeGenerationNodeData = {
  id: string;
  agent: "codeGenerationAgent";
  params: {
    prompt: string;
    tneModel: string;
    agent?: ComputedNodeData;
    outputType: string;
    useUserQuery: boolean;
  };
  passThrough: {
    nodeType: typeof NodeTypeCodeGeneration;
    nodeId: string;
    nodeTitle: string;
  };
  isResult: boolean;
};
export type CodeGenerationReactFlowNode = {
  type: typeof NodeTypeCodeGeneration;
  data: CodeGenerationNodeData;
} & ReactFlowNodeBase;
export declare const codeGenerationDefaultValue: CodeGenerationNodeData;
export declare const initCodeGenerationAgent: (id: string) => CodeGenerationNodeData;
export declare const updateCodeGenerationAgent: (
  id: string,
  title: string,
  slashgptManifest: string,
  prompt: string,
  outputType: string,
  outputToCanvas: boolean,
  useUserQuery: boolean,
  agent?: ComputedNodeData
) => CodeGenerationNodeData;

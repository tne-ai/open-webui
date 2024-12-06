import { ComputedNodeData } from "graphai";
import { NodeTypeCodeGeneration } from "../types";

export const CodeGenerationS3modelPath = "Agents/codeGenerator.model";

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

export const codeGenerationDefaultValue: CodeGenerationNodeData = {
  id: "",
  agent: "codeGenerationAgent",
  params: {
    prompt: "",
    tneModel: "",
    outputType: "overwrite",
    useUserQuery: false,
  },
  passThrough: {
    nodeType: NodeTypeCodeGeneration,
    nodeId: "",
    nodeTitle: "Generate Code",
  },
  isResult: true,
};

export const initCodeGenerationAgent = (id: string): CodeGenerationNodeData => {
  const init = { ...codeGenerationDefaultValue };
  if (init?.passThrough?.nodeId === "") {
    init.passThrough.nodeId = id;
  }
  return {
    ...init,
    id,
  };
};

export const updateCodeGenerationAgent = (
  id: string,
  title: string,
  slashgptManifest: string,
  prompt: string,
  outputType: string,
  outputToCanvas: boolean,
  useUserQuery: boolean,
  agent?: ComputedNodeData
): CodeGenerationNodeData => {
  return {
    id,
    agent: "codeGenerationAgent",
    params: {
      prompt,
      tneModel: slashgptManifest,
      agent,
      outputType,
      useUserQuery,
    },
    passThrough: {
      nodeType: NodeTypeCodeGeneration,
      nodeId: id,
      nodeTitle: title,
    },
    isResult: outputToCanvas === false,
  };
};

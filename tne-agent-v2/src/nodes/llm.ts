import { NodeTypeLLM, StateFlowState } from "../types";

export type LLMNodeData = {
  id: string;
  agent: string;
  params: {
    tneModel: string;
    mapping: string;
    outputType: string;
    toolJson: string;
    toolCode: string;
    useUserQuery: boolean;
    stream: boolean;
    flowState?: StateFlowState;
  };
  passThrough: {
    nodeType: typeof NodeTypeLLM;
    nodeId: string;
    nodeTitle: string;
  };
  isResult: boolean;
};

export const llmAgentDefaultValue: LLMNodeData = {
  id: "",
  agent: "llmAgent",
  params: {
    tneModel: "",
    mapping: "",
    outputType: "overwrite",
    toolJson: "",
    toolCode: "",
    useUserQuery: false,
    stream: true,
  },
  passThrough: {
    nodeType: NodeTypeLLM,
    nodeTitle: "New Model",
    nodeId: "",
  },
  isResult: true,
};
export const initLlmAgent = (id: string): LLMNodeData => {
  const init = { ...llmAgentDefaultValue };
  if (init?.passThrough?.nodeId === "") {
    init.passThrough.nodeId = id;
  }
  return {
    ...init,
    id,
  };
};

export const updateLlmAgent = (
  id: string,
  title: string,
  input: string,
  slashgptManifest: string,
  toolJson: string,
  toolCode: string,
  outputType: string,
  outputToCanvas: boolean,
  useUserQuery: boolean,
  flowState?: StateFlowState
): LLMNodeData => {
  return {
    id,
    agent: "llmAgent",
    params: {
      tneModel: slashgptManifest,
      mapping: input,
      outputType,
      toolJson,
      toolCode,
      useUserQuery,
      stream: true,
      flowState: flowState,
    },
    passThrough: {
      nodeType: NodeTypeLLM,
      nodeId: id,
      nodeTitle: title,
    },
    isResult: outputToCanvas === false,
  };
};

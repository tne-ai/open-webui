import { NodeTypeDebug } from "../types";

export type DebugNodeData = {
  id: string;
  agent: "debugAgent";
  params: {
    outputName: string;
  };
  passThrough: {
    nodeType: typeof NodeTypeDebug;
    nodeId: string;
    nodeTitle: string;
  };
};

export const debugAgentDefaultValue: DebugNodeData = {
  id: "",
  agent: "debugAgent",
  params: {
    outputName: "",
  },
  passThrough: {
    nodeType: NodeTypeDebug,
    nodeId: "",
    nodeTitle: "Prompt Debugger",
  },
};

export const initDebugAgent = (id: string): DebugNodeData => {
  const init = { ...debugAgentDefaultValue };
  if (init?.passThrough?.nodeId === "") {
    init.passThrough.nodeId = id;
  }
  return {
    ...init,
    id,
  };
};
export const updateDebugAgent = (id: string, title: string, outputName: string): DebugNodeData => {
  return {
    id,
    agent: "debugAgent",
    params: {
      outputName,
    },
    passThrough: {
      nodeType: NodeTypeDebug,
      nodeId: id,
      nodeTitle: title,
    },
  };
};

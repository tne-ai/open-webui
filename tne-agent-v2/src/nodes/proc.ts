import { StateFlowState, NodeTypeNested } from "../types";

export type ProcNodeData = {
  id: string;
  agent: "nestedAgent";
  params: {
    graphDataFile: string;
    outputType: string;
    useUserQuery: boolean;
    flowState?: StateFlowState;
  };
  passThrough: {
    nodeType: typeof NodeTypeNested;
    nodeId: string;
    nodeTitle: string;
  };
  isResult: boolean;
};

export const procAgentDefaultValue: ProcNodeData = {
  id: "",
  agent: "nestedAgent",
  params: {
    graphDataFile: "",
    outputType: "overwrite",
    useUserQuery: false,
  },
  passThrough: {
    nodeType: NodeTypeNested,
    nodeTitle: "New Process",
    nodeId: "",
  },
  isResult: true,
};

export const initProcAgent = (id: string): ProcNodeData => {
  const init = { ...procAgentDefaultValue };
  if (init?.passThrough?.nodeId === "") {
    init.passThrough.nodeId = id;
  }
  return {
    ...init,
    id,
  };
};

export const updateProcAgent = (
  id: string,
  title: string,
  proc: string,
  outputType: string,
  outputToCanvas: boolean,
  flowState?: StateFlowState
): ProcNodeData => {
  return {
    id,
    agent: "nestedAgent",
    params: {
      graphDataFile: proc,
      outputType: outputType,
      flowState: flowState,
      useUserQuery: false,
    },
    passThrough: {
      nodeType: NodeTypeNested,
      nodeId: id,
      nodeTitle: title,
    },
    isResult: outputToCanvas === false,
  };
};

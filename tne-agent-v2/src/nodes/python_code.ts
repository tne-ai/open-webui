import { NodeTypePythonCode, StateFlowState } from "../types";

export type PythonCodeNodeData = {
  id: string;
  agent: "pythonCodeAgent";
  params: {
    module: string; // fileName
    outputType: string;
    flowState?: StateFlowState;
  };
  passThrough: {
    nodeType: typeof NodeTypePythonCode;
    nodeId: string;
    nodeTitle: string;
  };
  isResult: boolean;
};

export const pythonCodeAgentDefaultValue: PythonCodeNodeData = {
  id: "",
  agent: "pythonCodeAgent",
  params: {
    module: "",
    outputType: "overwrite",
  },
  passThrough: {
    nodeType: NodeTypePythonCode,
    nodeId: "",
    nodeTitle: "New Code",
  },
  isResult: true,
};

export const initPythonCodeAgent = (id: string, title?: string): PythonCodeNodeData => {
  const init = { ...pythonCodeAgentDefaultValue };
  if (init?.passThrough?.nodeId === "") {
    init.passThrough.nodeId = id;
  }
  if (title) {
    init.passThrough.nodeTitle = title;
  }
  return {
    ...init,
    id,
  };
};

export const updatePythonCodeAgent = (
  id: string,
  title: string,
  module: string,
  outputType: string,
  outputToCanvas: boolean,
  flowState?: StateFlowState
): PythonCodeNodeData => {
  return {
    id,
    agent: "pythonCodeAgent",
    params: {
      module,
      outputType,
      flowState,
    },
    passThrough: {
      nodeType: NodeTypePythonCode,
      nodeId: id,
      nodeTitle: title,
    },
    isResult: outputToCanvas === false,
  };
};

import { NodeTypeFile, StateFlowState } from "../types";

export type FileNodeData = {
  id: string;
  agent: "s3FileAgent";
  params: {
    fileName: string;
    flowState?: StateFlowState;
  };
  passThrough: {
    nodeType: typeof NodeTypeFile;
    nodeId: string;
    nodeTitle: string;
  };
};

export const fileAgentDefaultValue: FileNodeData = {
  id: "",
  agent: "s3FileAgent",
  params: {
    fileName: "",
  },
  passThrough: {
    nodeType: NodeTypeFile,
    nodeId: "",
    nodeTitle: "Data",
  },
};

export const initFileAgent = (id: string): FileNodeData => {
  const init = { ...fileAgentDefaultValue };
  if (init?.passThrough?.nodeId === "") {
    init.passThrough.nodeId = id;
  }
  return {
    ...init,
    id,
  };
};

export const updateFileAgent = (id: string, title: string, fileName: string, flowState?: StateFlowState): FileNodeData => {
  return {
    id,
    agent: "s3FileAgent",
    params: {
      fileName,
      flowState,
    },
    passThrough: {
      nodeType: NodeTypeFile,
      nodeId: id,
      nodeTitle: title,
    },
  };
};

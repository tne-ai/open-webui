import { NodeTypeOut } from "../types";

export type OutNodeData = {
  id: string;
  agent: "s3FileWriteAgent";
  params: {
    fileName: string;
    bucket?: string; // TODO
    region?: string; // TODO
  };
  passThrough: {
    nodeType: typeof NodeTypeOut;
    nodeId: string;
    nodeTitle: string;
  };
};

export const outAgentDefaultValue: OutNodeData = {
  id: "",
  agent: "s3FileWriteAgent",
  params: {
    fileName: "",
  },
  passThrough: {
    nodeType: NodeTypeOut,
    nodeId: "",
    nodeTitle: "Save File",
  },
};

export const initOutAgent = (id: string): OutNodeData => {
  const init = { ...outAgentDefaultValue };
  if (init?.passThrough?.nodeId === "") {
    init.passThrough.nodeId = id;
  }
  return {
    ...init,
    id,
  };
};

export const updateOutAgent = (id: string, title: string, outputName: string): OutNodeData => {
  return {
    id,
    agent: "s3FileWriteAgent",
    params: {
      fileName: outputName,
    },
    passThrough: {
      nodeType: NodeTypeOut,
      nodeId: id,
      nodeTitle: title,
    },
  };
};

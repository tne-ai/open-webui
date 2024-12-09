import { NodeTypeRAG } from "../types";

export type RagNodeData = {
  id: string;
  agent: "ragAgent";
  params: {
    ragDbName: string;
    outputType: string;
    showDebug: boolean;
  };
  passThrough: {
    nodeType: typeof NodeTypeRAG;
    nodeId: string;
    nodeTitle: string;
  };
  isResult: boolean;
};

export const ragAgentDefaultValue: RagNodeData = {
  id: "",
  agent: "ragAgent",
  params: {
    ragDbName: "",
    outputType: "overwrite",
    showDebug: false,
  },
  passThrough: {
    nodeType: NodeTypeRAG,
    nodeId: "",
    nodeTitle: "New RAG",
  },
  isResult: true,
};

export const initRagAgent = (id: string): RagNodeData => {
  const init = { ...ragAgentDefaultValue };
  if (init?.passThrough?.nodeId === "") {
    init.passThrough.nodeId = id;
  }
  return {
    ...init,
    id,
  };
};

export const updateRagAgent = (id: string, title: string, ragDbName: string, outputType: string, outputToCanvas: boolean, showDebug: boolean) => {
  return {
    id,
    agent: "ragAgent",
    params: {
      ragDbName: ragDbName,
      outputType,
      showDebug,
    },
    passThrough: {
      nodeType: NodeTypeRAG,
      nodeId: id,
      nodeTitle: title,
    },
    isResult: outputToCanvas === false,
  };
};

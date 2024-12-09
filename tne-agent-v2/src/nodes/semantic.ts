import { NodeTypeSemantic } from "../types";

export type SemanticNodeData = {
  id: string;
  agent: string;
  params: {
    ragDbName: string;
    maxEmbeddings: number;
    similarityThreshold: number;
    outputType: string; // ?? TODO
    showDebug: boolean; // ?? TODO
  };
  passThrough: {
    nodeType: typeof NodeTypeSemantic;
    nodeId: string;
    nodeTitle: string;
  };
  isResult: boolean;
};

export const semanticAgentDefaultValue: SemanticNodeData = {
  id: "",
  agent: "semanticAgent",
  params: {
    ragDbName: "",
    maxEmbeddings: 10,
    similarityThreshold: 0.8,
    outputType: "",
    showDebug: false,
    // outputType
  },
  passThrough: {
    nodeType: NodeTypeSemantic,
    nodeId: "",
    nodeTitle: "New Semantic Search",
  },
  isResult: true,
};

export const initSemanticAgent = (id: string): SemanticNodeData => {
  const init = { ...semanticAgentDefaultValue };
  if (init?.passThrough?.nodeId === "") {
    init.passThrough.nodeId = id;
  }
  return {
    ...init,
    id,
  };
};

export const updateSemanticAgent = (
  id: string,
  title: string,
  ragDbName: string,
  outputType: string,
  outputToCanvas: boolean,
  showDebug: boolean,
  maxEmbeddings: number,
  similarityThreshold: number
): SemanticNodeData => {
  return {
    id,
    agent: "semanticAgent",
    params: {
      ragDbName: ragDbName,
      outputType,
      showDebug,
      maxEmbeddings,
      similarityThreshold,
    },
    passThrough: {
      nodeType: NodeTypeSemantic,
      nodeId: id,
      nodeTitle: title,
    },
    isResult: outputToCanvas === false,
  };
};

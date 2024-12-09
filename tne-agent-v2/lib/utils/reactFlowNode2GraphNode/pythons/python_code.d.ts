import { ReactFlowNodePythonCode } from "../../../types";
export declare const reactFlowNode2GraphPythonCodeNode: (
  node: ReactFlowNodePythonCode,
  code?: string
) => {
  agent: string;
  params: Record<string, unknown>;
  passThrough: {
    nodeType: string;
    nodeId: string;
    nodeTitle: string;
  };
  isResult: boolean;
};

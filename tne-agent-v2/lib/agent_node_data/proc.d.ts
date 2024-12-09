import { NodeTypeNested, ReactFlowNodeBase } from "../types";
export type ProcNodeData = {
  id: string;
  agent: "nestedAgent";
  params: {
    graphDataFile: string;
    outputType: string;
    useUserQuery: boolean;
  };
  passThrough: {
    nodeType: typeof NodeTypeNested;
    nodeId: string;
    nodeTitle: string;
  };
  isResult: boolean;
};
export type ProcReactFlowNode = {
  type: typeof NodeTypeNested;
  data: ProcNodeData;
} & ReactFlowNodeBase;
export declare const procAgentDefaultValue: ProcNodeData;
export declare const initProcAgent: (id: string) => ProcNodeData;
export declare const updateProcAgent: (id: string, title: string, proc: string, outputType: string, outputToCanvas: boolean) => ProcNodeData;

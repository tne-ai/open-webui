import { ComputedNodeData } from "graphai";
import { ReactFlowNodeProc, ReactFlowData, ReactFlowNode } from "../../../types";
import { ExpertDataModel } from "../../../expertDataModel";
export declare const reactFlowNode2GraphNestedNode: (
  node: ReactFlowNodeProc,
  proc: ReactFlowData,
  expertDataModel: ExpertDataModel | null,
  parentSources: Record<string, string[]>
) => Promise<{
  node: ComputedNodeData;
  nodesData: ReactFlowNode[];
}>;

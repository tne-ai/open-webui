import { ComputedNodeData } from "graphai";
import { ExpertReactFlowNode, ReactFlowData } from "../../types";
import { ExpertDataModel } from "../../expertDataModel";
export declare const nestedAgent: (node: ExpertReactFlowNode, expert: ReactFlowData, expertDataModel: ExpertDataModel | null, parentSources: Record<string, string[]>) => Promise<ComputedNodeData>;

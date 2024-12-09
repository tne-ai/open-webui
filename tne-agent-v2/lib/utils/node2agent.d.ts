import { ComputedNodeData, NodeData } from "graphai";
import { ExpertDataModel } from "../expertDataModel";
import { AgentReactFlowNode, ReactFlowData, SourcesDict } from "../types";
export declare const node2modelFileName: (node: AgentReactFlowNode) => string | null;
export declare const node2moduleFileName: (node: AgentReactFlowNode) => string | null;
export declare const node2procFileName: (node: AgentReactFlowNode) => string | null;
export declare const reactFlowNode2GraphNode: (node: AgentReactFlowNode, models: Record<string, ComputedNodeData>, modules: Record<string, string>, expertData: Record<string, ReactFlowData>, parentSources: SourcesDict, expertDataModel?: ExpertDataModel | null) => Promise<NodeData>;

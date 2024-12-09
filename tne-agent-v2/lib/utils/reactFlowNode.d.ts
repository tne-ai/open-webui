import { ComputedNodeData, NodeData } from "graphai";
import { AgentReactFlowNode, ProcReactFlowNode } from "../agent_node_data";
import { ExpertDataModel } from "../expertDataModel";
import { ReactFlowData } from "../types";
export declare const node2modelFileName: (node: AgentReactFlowNode) => string | null;
export declare const node2moduleFileName: (node: AgentReactFlowNode) => string | null;
export declare const node2procFileName: (node: AgentReactFlowNode) => string | null;
export declare const reactFlowNode2GraphNode: (node: AgentReactFlowNode, models: Record<string, ComputedNodeData>, modules: Record<string, string>) => NodeData;
export declare const reactFlowNode2GraphNestedNodeWrap: (
  node: ProcReactFlowNode,
  procs: Record<string, ReactFlowData>,
  expertDataModel?: ExpertDataModel | null,
  parentSources?: Record<string, string[]>
) => Promise<{
  node: ComputedNodeData;
  nodesData: AgentReactFlowNode[];
} | null>;

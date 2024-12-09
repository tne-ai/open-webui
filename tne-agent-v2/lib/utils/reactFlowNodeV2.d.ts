import { ComputedNodeData, StaticNodeData } from "graphai";
import { AgentReactFlowNode } from "../agent_node_data";
import { ReactFlowModel } from "../types";
export declare const reactFlowNode2GraphNodeV2: (
  node: AgentReactFlowNode,
  models: Record<string, ReactFlowModel>,
  modules: Record<string, string>
) => (ComputedNodeData | StaticNodeData)[];

import { ComputedNodeData } from "graphai";
import { ExpertReactFlowNode, ReactFlowData } from "../../types";
import { ExpertDataModel } from "../../expertDataModel";

const getGraphData = async (_expertDataModel: ExpertDataModel, expert: ReactFlowData, parentSources: Record<string, string[]>) => {
  const expertDataModel = _expertDataModel.clone();
  await expertDataModel.setExpert(expert);
  return await expertDataModel.convertGraphAi(parentSources);
};

export const nestedAgent = async (
  node: ExpertReactFlowNode,
  expert: ReactFlowData,
  expertDataModel: ExpertDataModel | null,
  parentSources: Record<string, string[]>
): Promise<ComputedNodeData> => {
  const { passThrough, isResult, params } = node.data;

  const graphData = expertDataModel ? await getGraphData(expertDataModel, expert, parentSources) : { version: 0.5, nodes: {} };
  return {
    agent: "nestedAgent",
    graph: graphData,
    params,
    passThrough,
    isResult,
  };
};

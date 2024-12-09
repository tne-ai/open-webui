"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactFlowNode2GraphNestedNode = void 0;
const utils_1 = require("../../utils");
const getGraphData = async (expertDataModel, proc, parentSources) => {
  const model = expertDataModel.clone();
  await model.setExpert(proc);
  const graphData = await model.convertGraphAi(parentSources);
  const nodesData = model.getNodesData();
  return { graphData, nodesData };
};
const reactFlowNode2GraphNestedNode = async (node, proc, expertDataModel, parentSources) => {
  const { graphData, nodesData } = expertDataModel
    ? await getGraphData(expertDataModel, proc, parentSources)
    : {
        graphData: { version: 0.5, nodes: {} },
        nodesData: [],
      };
  return {
    node: {
      agent: "nestedAgent",
      passThrough: {
        nodeType: "nested",
        nodeId: node.id,
      },
      graph: graphData,
      isResult: (0, utils_1.getIsResult)(node),
    },
    nodesData,
  };
};
exports.reactFlowNode2GraphNestedNode = reactFlowNode2GraphNestedNode;

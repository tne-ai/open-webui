"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nestedAgent = void 0;
const getGraphData = async (_expertDataModel, expert, parentSources) => {
    const expertDataModel = _expertDataModel.clone();
    await expertDataModel.setExpert(expert);
    return await expertDataModel.convertGraphAi(parentSources);
};
const nestedAgent = async (node, expert, expertDataModel, parentSources) => {
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
exports.nestedAgent = nestedAgent;

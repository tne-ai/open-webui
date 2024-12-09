"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactFlowNode2GraphNode = exports.node2procFileName = exports.node2moduleFileName = exports.node2modelFileName = void 0;
const types_1 = require("../types");
const agent2agent_1 = require("./agent2agent");
const node2modelFileName = (node) => {
    if (node.type === types_1.NodeTypeLLM) {
        return node.data.params.tneModel;
    }
    return null;
};
exports.node2modelFileName = node2modelFileName;
const node2moduleFileName = (node) => {
    if (node.type === types_1.NodeTypePythonCode) {
        return node.data.params.module;
    }
    return null;
};
exports.node2moduleFileName = node2moduleFileName;
const node2procFileName = (node) => {
    if (node.type === types_1.NodeTypeNested) {
        return node.data.params.graphDataFile;
    }
    return null;
};
exports.node2procFileName = node2procFileName;
const reactFlowNode2GraphNode = async (node, models, modules, expertData, parentSources, expertDataModel = null) => {
    if (node.type === types_1.NodeTypeLLM) {
        const modelName = node.data.params.tneModel;
        const model = models[modelName];
        return (0, agent2agent_1.llmAgent)(node, model ?? {});
    }
    if (node.type === types_1.NodeTypeCodeGeneration) {
        const modelName = node.data.params.tneModel;
        const model = models[modelName];
        return (0, agent2agent_1.codeGenerationAgent)(node, model ?? {});
    }
    if (node.type === types_1.NodeTypePythonCode) {
        const code = node.data?.params?.module ? modules[node.data?.params?.module] : undefined;
        return (0, agent2agent_1.pythonCodeAgent)(node, code);
    }
    if (node.type === types_1.NodeTypeNested) {
        const proc = node.data?.params.graphDataFile ? expertData[node.data?.params.graphDataFile] : undefined;
        if (proc) {
            return await (0, agent2agent_1.nestedAgent)(node, proc, expertDataModel, parentSources);
        }
    }
    if (node.type === types_1.NodeTypeText) {
        // TODO update
        const { value } = node.data;
        return {
            value,
        };
    }
    const { agent, params, passThrough, isResult } = node.data;
    return {
        agent,
        params,
        passThrough,
        isResult,
    };
};
exports.reactFlowNode2GraphNode = reactFlowNode2GraphNode;

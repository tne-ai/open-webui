"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.llmAgent = void 0;
const llmAgent = (node, llmAgentBase) => {
    const { isResult, params, passThrough } = node.data;
    const id = passThrough.nodeId ?? "";
    const { agent, params: baseParams, passThrough: llmPassThrough } = llmAgentBase;
    const { useUserQuery } = params;
    return {
        agent,
        params: {
            ...baseParams,
            useUserQuery,
        },
        passThrough: {
            ...passThrough,
            nodeId: id,
            llmType: llmPassThrough?.nodeType,
        },
        isResult,
    };
};
exports.llmAgent = llmAgent;

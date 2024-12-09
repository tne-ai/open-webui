"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pythonCodeAgent = void 0;
const pythonCodeAgent = (node, code) => {
    const { agent, params, passThrough, isResult } = node.data;
    // delete agent.id;
    return {
        agent,
        params: {
            ...params,
            code,
        },
        passThrough,
        isResult,
    };
};
exports.pythonCodeAgent = pythonCodeAgent;

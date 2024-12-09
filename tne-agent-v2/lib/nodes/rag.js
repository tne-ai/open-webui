"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRagAgent = exports.initRagAgent = exports.ragAgentDefaultValue = void 0;
const types_1 = require("../types");
exports.ragAgentDefaultValue = {
    id: "",
    agent: "ragAgent",
    params: {
        ragDbName: "",
        outputType: "overwrite",
        showDebug: false,
    },
    passThrough: {
        nodeType: types_1.NodeTypeRAG,
        nodeId: "",
        nodeTitle: "New RAG",
    },
    isResult: true,
};
const initRagAgent = (id) => {
    const init = { ...exports.ragAgentDefaultValue };
    if (init?.passThrough?.nodeId === "") {
        init.passThrough.nodeId = id;
    }
    return {
        ...init,
        id,
    };
};
exports.initRagAgent = initRagAgent;
const updateRagAgent = (id, title, ragDbName, outputType, outputToCanvas, showDebug) => {
    return {
        id,
        agent: "ragAgent",
        params: {
            ragDbName: ragDbName,
            outputType,
            showDebug,
        },
        passThrough: {
            nodeType: types_1.NodeTypeRAG,
            nodeId: id,
            nodeTitle: title,
        },
        isResult: outputToCanvas === false,
    };
};
exports.updateRagAgent = updateRagAgent;

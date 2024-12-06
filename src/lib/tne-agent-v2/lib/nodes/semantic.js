"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSemanticAgent = exports.initSemanticAgent = exports.semanticAgentDefaultValue = void 0;
const types_1 = require("../types");
exports.semanticAgentDefaultValue = {
    id: "",
    agent: "semanticAgent",
    params: {
        ragDbName: "",
        maxEmbeddings: 10,
        similarityThreshold: 0.8,
        outputType: "",
        showDebug: false,
        // outputType
    },
    passThrough: {
        nodeType: types_1.NodeTypeSemantic,
        nodeId: "",
        nodeTitle: "New Semantic Search",
    },
    isResult: true,
};
const initSemanticAgent = (id) => {
    const init = { ...exports.semanticAgentDefaultValue };
    if (init?.passThrough?.nodeId === "") {
        init.passThrough.nodeId = id;
    }
    return {
        ...init,
        id,
    };
};
exports.initSemanticAgent = initSemanticAgent;
const updateSemanticAgent = (id, title, ragDbName, outputType, outputToCanvas, showDebug, maxEmbeddings, similarityThreshold) => {
    return {
        id,
        agent: "semanticAgent",
        params: {
            ragDbName: ragDbName,
            outputType,
            showDebug,
            maxEmbeddings,
            similarityThreshold,
        },
        passThrough: {
            nodeType: types_1.NodeTypeSemantic,
            nodeId: id,
            nodeTitle: title,
        },
        isResult: outputToCanvas === false,
    };
};
exports.updateSemanticAgent = updateSemanticAgent;

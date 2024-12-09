"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.semanticAgent = void 0;
const graphai_1 = require("graphai");
const client_1 = require("../client");
const rag_utils_1 = require("./rag_utils");
const semanticAgent = async ({ params, namedInputs, config }) => {
    const { userInput, array } = namedInputs;
    const { semanticDbName, maxEmbeddings, similarityThreshold } = params;
    // maxEmbeddings: 10, similarityThreshold: 0.8
    const semanticServerUrl = params.semanticServerUrl ?? config?.semanticServerUrl;
    const queryText = userInput ?? array.join("\n");
    const semanticRequest = (0, rag_utils_1.getSemanticRequest)(semanticDbName, queryText, { maxEmbeddings, similarityThreshold });
    const res = await (0, client_1.httpRequest)(semanticServerUrl, semanticRequest);
    return res;
};
exports.semanticAgent = semanticAgent;
const semanticAgentInfo = (0, graphai_1.agentInfoWrapper)(exports.semanticAgent);
exports.default = semanticAgentInfo;

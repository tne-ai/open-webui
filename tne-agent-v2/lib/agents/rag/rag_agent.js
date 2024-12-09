"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ragAgent = void 0;
const graphai_1 = require("graphai");
const rag_utils_1 = require("./rag_utils");
const client_1 = require("../client");
const ragAgent = async ({ params, namedInputs, filterParams, config }) => {
    const { userInput, array } = namedInputs;
    const { ragDbName } = params;
    const ragServerUrl = params.ragServerUrl ?? config?.ragServerUrl;
    const queryText = userInput ?? array.join("\n");
    const ragRequest = (0, rag_utils_1.getRagRequest)(ragDbName, queryText);
    const generator = (0, client_1.streamingRequest)(ragServerUrl, ragRequest);
    const ret = {
        rag_output: "",
        anns_summary: "",
    };
    for await (const token of generator) {
        if (token["patch_record"]["anns_summary"] || token["patch_record"]["rag_output"]) {
            const diff = {};
            if (token["patch_record"]["rag_output"]) {
                diff["rag_output"] = token["patch_record"]["rag_output"]["text"];
                ret["rag_output"] = ret["rag_output"] + diff["rag_output"];
            }
            if (token["patch_record"]["anns_summary"]) {
                diff["anns_summary"] = token["patch_record"]["anns_summary"]["text"];
                ret["anns_summary"] = ret["anns_summary"] + diff["anns_summary"];
            }
            if (filterParams && filterParams.streamTokenCallback && token) {
                filterParams.streamTokenCallback(diff);
            }
        }
        else {
            console.log(token);
            // console.log(token["patch_record"]);
        }
    }
    return ret;
};
exports.ragAgent = ragAgent;
const ragAgentInfo = (0, graphai_1.agentInfoWrapper)(exports.ragAgent);
exports.default = ragAgentInfo;

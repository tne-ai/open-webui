"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAgentFilters = exports.tneDataConverterAgentFilter = void 0;
const agent_filters_1 = require("@graphai/agent_filters");
const tneDataConverterAgentFilter = async (context, next) => {
    if (context.namedInputs.file && Array.isArray(context.namedInputs.file)) {
        context.namedInputs.file.forEach((file) => {
            if (file.dataType === "text") {
                if (!context.namedInputs["mergeableSystem"]) {
                    context.namedInputs["mergeableSystem"] = [];
                }
                if (Array.isArray(context.namedInputs["mergeableSystem"])) {
                    // for type error
                    context.namedInputs["mergeableSystem"].push(`FILENAME: ${file.fileName}\n\n`);
                    context.namedInputs["mergeableSystem"].push(file.text);
                }
            }
            if (file.dataType === "image") {
                if (!context.namedInputs["images"]) {
                    context.namedInputs["images"] = [];
                }
                if (Array.isArray(context.namedInputs["images"])) {
                    // for type error
                    context.namedInputs["images"].push(file.imageData);
                }
            }
        });
        delete context.namedInputs.file;
    }
    // console.log(context);
    return next(context);
};
exports.tneDataConverterAgentFilter = tneDataConverterAgentFilter;
const tneTimeStampAgentFilter = async (context, next) => {
    const result = await next(context);
    if (result instanceof Object && !(result instanceof Array)) {
        result["__timestamp"] = new Date().getTime();
    }
    return result;
};
const getAgentFilters = (outputConsole = true) => {
    const callback = (__context, data) => {
        if (outputConsole) {
            console.log(data);
        }
    };
    const streamAgentFilter = (0, agent_filters_1.streamAgentFilterGenerator)(callback);
    const agentFilters = [
        {
            name: "streamAgentFilter",
            agent: exports.tneDataConverterAgentFilter,
            agentIds: ["openAIAgent", "openAIImageAgent", "groqAgent", "anthropicAgent", "geminiAgent"],
        },
        {
            name: "streamAgentFilter",
            agent: streamAgentFilter,
        },
        {
            name: "tneTimeStampAgentFilter",
            agent: tneTimeStampAgentFilter,
        },
    ];
    return agentFilters;
};
exports.getAgentFilters = getAgentFilters;

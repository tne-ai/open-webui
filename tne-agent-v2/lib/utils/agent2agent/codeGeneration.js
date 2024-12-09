"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.codeGenerationAgent = void 0;
const llmAgent_1 = require("./llmAgent");
const pythonCode_1 = require("./pythonCode");
const nodes_1 = require("../../nodes");
const types_1 = require("../../types");
const codeGenerationAgent = (node, llmAgentBase) => {
    const { params, passThrough, isResult } = node.data;
    const id = passThrough.nodeId ?? "";
    const { prompt } = params || {};
    const title = passThrough?.nodeTitle ?? "";
    const llmId = id + "_llm";
    const llm = (0, llmAgent_1.llmAgent)({ id: llmId, type: "llm", data: (0, nodes_1.initLlmAgent)(llmId) }, params.agent ?? llmAgentBase);
    if (llm?.params?.stream) {
        llm.params.stream = false;
    }
    const pythonId = id + "_python";
    const python = (0, pythonCode_1.pythonCodeAgent)({ id: pythonId, type: types_1.NodeTypePythonCode, data: (0, nodes_1.initPythonCodeAgent)(pythonId, passThrough?.nodeTitle) });
    return {
        agent: "nestedAgent",
        params: {
            useUserQuery: params.useUserQuery,
        },
        graph: {
            version: 0.5,
            nodes: {
                [id + "_codeGeneration"]: {
                    agent: "codeGenerationTemplateAgent",
                    params: {
                        prompt,
                    },
                    passThrough: {
                        nodeType: types_1.NodeTypeCodeGenerationTemplate,
                        nodeId: id + "_codeGeneration",
                        nodeTitle: title ?? "",
                    },
                    inputs: {
                        file: ":file",
                        inputs: ":inputs",
                        userPrompt: ":userPrompt",
                    },
                },
                [llmId]: {
                    ...llm,
                    inputs: {
                        prompt: ":" + id + "_codeGeneration.prompt",
                        model: ":" + id + "_codeGeneration.model",
                        system: ":" + id + "_codeGeneration.system",
                        temperature: ":" + id + "_codeGeneration.temperature",
                        max_tokens: ":" + id + "_codeGeneration.max_tokens",
                    },
                },
                [id + "_python"]: {
                    ...python,
                    params: {},
                    inputs: {
                        code: ":" + id + "_llm.choices.$0.message.content",
                    },
                },
            },
        },
        passThrough,
        isResult,
    };
};
exports.codeGenerationAgent = codeGenerationAgent;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.codeGenerationTemplateAgent = void 0;
const code_generation_utils_1 = require("./code_generation_utils");
const s3_1 = require("../../utils/s3");
// inputs
//  namedInputs
//    previous node
//      text or file
//    query
//      userPrompt
//  params
//    prompt
const codeGenerationTemplateAgent = async ({ namedInputs, config, params }) => {
    const { uid } = config;
    // prompt is
    const { prompt } = params; //proc_step.prompt. from ReactFlow node
    const { file, inputs, model, userPrompt } = namedInputs;
    const stepInput = inputs && inputs.length > 0 ? inputs.join("\n") : userPrompt; // this is llm question
    const codegenPrompt = (0, code_generation_utils_1.getCodegenPrompt)(uid, file ?? [], stepInput ?? ""); // step
    const manifest = await (0, code_generation_utils_1.getCodegenManifest)(s3_1.fetchS3File, prompt, codegenPrompt, model);
    // for openai agent
    return {
        prompt: stepInput,
        model: manifest.model,
        system: manifest.prompt,
        temperature: manifest.temperature,
        max_tokens: manifest.max_tokens,
    };
};
exports.codeGenerationTemplateAgent = codeGenerationTemplateAgent;
const codeGenerationTemplateAgentInfo = {
    name: "codeGenerationTemplateAgent",
    agent: exports.codeGenerationTemplateAgent,
    mock: exports.codeGenerationTemplateAgent,
    inputs: {},
    output: {},
    samples: [],
    description: "Python Code Agent",
    category: ["python"],
    author: "",
    repository: "",
    license: "",
    stream: true,
};
exports.default = codeGenerationTemplateAgentInfo;

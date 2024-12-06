"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCodegenManifest = exports.getCodegenPrompt = exports.updateDataContextBuffer = void 0;
const yaml_1 = require("yaml");
const code_generation_1 = require("../../nodes/code_generation");
const DATA_BUFFER_LENGTH = 2500;
const updateDataContextBuffer = (uid, dataSource) => {
    if (dataSource.dataType === "image") {
        return `${dataSource.fileName}: ${dataSource.imageData}\n`;
    }
    if (dataSource.dataType === "csv") {
        return `${dataSource.fileName}: ${dataSource.text.split("\n")[0]}\n`;
    }
    return dataSource.text.slice(0, DATA_BUFFER_LENGTH);
};
exports.updateDataContextBuffer = updateDataContextBuffer;
const getCodegenPrompt = (uid, dataSources, prompt) => {
    //  1. Use TNE Python SDK package to inject relevant data into LLM prompt
    const data_context_buffers = [`UID: ${uid}\n`];
    // a. Deterministically connected data sources from UI
    for (const dataSource of dataSources) {
        data_context_buffers.push((0, exports.updateDataContextBuffer)(uid, dataSource));
    }
    //  b. If step input exists, inject it into data_context_buffer
    // if (type(step_input) is pd.DataFrame) {  // TODO this case
    // step_input = step_input.head().to_string()
    const process_input = prompt.slice(0, DATA_BUFFER_LENGTH);
    data_context_buffers.push(`PROCESS_INPUT: ${process_input}`);
    return data_context_buffers.join("");
};
exports.getCodegenPrompt = getCodegenPrompt;
const getCodegenManifest = async (fetchFile, procStepPrompt, codegenPrompt, model) => {
    //  API call to the LLM for code generation
    const manifestFileBytes = await fetchFile("SYSTEM", code_generation_1.CodeGenerationS3modelPath);
    if (!manifestFileBytes) {
        throw new Error(`no ${code_generation_1.CodeGenerationS3modelPath}`);
    }
    const yamlText = Buffer.from(manifestFileBytes).toString("utf-8");
    const code_gen_manifest = (0, yaml_1.parse)(yamlText);
    if (model) {
        code_gen_manifest.model = model;
    }
    const extra = procStepPrompt ? `\n\nPROMPT FROM USER: ${procStepPrompt}` : "";
    const code_gen_prompt = `${codegenPrompt}\n\n${code_gen_manifest.prompt}` + extra;
    code_gen_manifest.prompt = code_gen_prompt;
    return code_gen_manifest;
};
exports.getCodegenManifest = getCodegenManifest;

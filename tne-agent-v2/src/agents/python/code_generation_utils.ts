import { parse } from "yaml";
import { S3Data } from "../../types";
import { fetchS3File } from "../../utils/s3";
import { CodeGenerationS3modelPath } from "../../nodes/code_generation";

export type Manifest = {
  model: any;
  prompt: string;
  temperature: number;
  max_tokens: number;
};

const DATA_BUFFER_LENGTH = 2500;

export const updateDataContextBuffer = (uid: string, dataSource: S3Data) => {
  if (dataSource.dataType === "image") {
    return `${dataSource.fileName}: ${dataSource.imageData}\n`;
  }
  if (dataSource.dataType === "csv") {
    return `${dataSource.fileName}: ${dataSource.text.split("\n")[0]}\n`;
  }
  return dataSource.text.slice(0, DATA_BUFFER_LENGTH);
};

export const getCodegenPrompt = (uid: string, dataSources: S3Data[], prompt: string) => {
  //  1. Use TNE Python SDK package to inject relevant data into LLM prompt
  const data_context_buffers = [`UID: ${uid}\n`];

  // a. Deterministically connected data sources from UI
  for (const dataSource of dataSources) {
    data_context_buffers.push(updateDataContextBuffer(uid, dataSource));
  }

  //  b. If step input exists, inject it into data_context_buffer
  // if (type(step_input) is pd.DataFrame) {  // TODO this case
  // step_input = step_input.head().to_string()
  const process_input = prompt.slice(0, DATA_BUFFER_LENGTH);
  data_context_buffers.push(`PROCESS_INPUT: ${process_input}`);
  return data_context_buffers.join("");
};

export const getCodegenManifest = async (fetchFile: typeof fetchS3File, procStepPrompt: string, codegenPrompt?: string, model?: any): Promise<Manifest> => {
  //  API call to the LLM for code generation
  const manifestFileBytes = await fetchFile("SYSTEM", CodeGenerationS3modelPath);
  if (!manifestFileBytes) {
    throw new Error(`no ${CodeGenerationS3modelPath}`);
  }
  const yamlText = Buffer.from(manifestFileBytes).toString("utf-8");
  const code_gen_manifest: Manifest = parse(yamlText);

  if (model) {
    code_gen_manifest.model = model;
  }

  const extra = procStepPrompt ? `\n\nPROMPT FROM USER: ${procStepPrompt}` : "";
  const code_gen_prompt = `${codegenPrompt}\n\n${code_gen_manifest.prompt}` + extra;

  code_gen_manifest.prompt = code_gen_prompt;

  return code_gen_manifest;
};

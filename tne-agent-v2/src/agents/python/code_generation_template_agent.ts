import { AgentFunction, AgentFunctionInfo } from "graphai";
import { getCodegenPrompt, getCodegenManifest } from "./code_generation_utils";
import { fetchS3File } from "../../utils/s3";
import { S3Data } from "../../types";

// inputs
//  namedInputs
//    previous node
//      text or file
//    query
//      userPrompt
//  params
//    prompt

export const codeGenerationTemplateAgent: AgentFunction<
  { prompt: string }, // params
  {
    prompt?: string;
    model: string;
    system: string;
    temperature: number;
    max_tokens: number;
  },
  null,
  { file: S3Data[]; inputs?: string[]; model?: any; userPrompt?: string } // namedInputs
> = async ({ namedInputs, config, params }) => {
  const { uid } = config as Record<string, string>;
  // prompt is
  const { prompt } = params; //proc_step.prompt. from ReactFlow node
  const { file, inputs, model, userPrompt } = namedInputs;

  const stepInput = inputs && inputs.length > 0 ? inputs.join("\n") : userPrompt; // this is llm question
  const codegenPrompt = getCodegenPrompt(uid, file ?? [], stepInput ?? ""); // step
  const manifest = await getCodegenManifest(fetchS3File, prompt, codegenPrompt, model);

  // for openai agent
  return {
    prompt: stepInput,
    model: manifest.model,
    system: manifest.prompt,
    temperature: manifest.temperature,
    max_tokens: manifest.max_tokens,
  };
};

const codeGenerationTemplateAgentInfo: AgentFunctionInfo = {
  name: "codeGenerationTemplateAgent",
  agent: codeGenerationTemplateAgent,
  mock: codeGenerationTemplateAgent,
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

export default codeGenerationTemplateAgentInfo;

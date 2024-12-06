import test from "node:test";
import { fetchS3File } from "../../src/utils/s3";
import assert from "node:assert";

import { getCodegenPrompt, getCodegenManifest } from "../../src/agents/python/code_generation_utils";
import { openAIAgent } from "@graphai/llm_agents";

test("test run code gen", async () => {
  const uid = "113131128239301637682";
  const fileNames = [
    {
      dataType: "csv" as const,
      fileName: "data/Sentiment.csv",
      text: "a,b,c",
    },
    {
      dataType: "text" as const,
      fileName: "data/res_arcana_state.txt",
      text: "this is file",
    },
  ];
  const userPrompt = "user prompt";

  const prompt = "このデータを日本語に変換するスクリプト";
  const codegenPrompt = await getCodegenPrompt(uid, fileNames, prompt);
  const manifest = await getCodegenManifest(fetchS3File, userPrompt, codegenPrompt, undefined);

  console.log(manifest);

  const namedInputs = {
    prompt,
    model: manifest.model,
    system: manifest.prompt,
    temperature: manifest.temperature,
    max_tokens: manifest.max_tokens,
  };
  const res = await openAIAgent.agent({
    namedInputs,
    params: {},
    filterParams: {},
    inputs: [],
    debugInfo: {} as any,
  });
  console.log(res.choices);
});

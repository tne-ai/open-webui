import { stringify } from "yaml";

import { getCodegenPrompt, getCodegenManifest } from "../../src/agents/python/code_generation_utils";
import { CodeGenerationS3modelPath } from "../../src/nodes/code_generation";

import test from "node:test";
import assert from "node:assert";

const manifest = {
  title: "codeGenerator",
  model: {
    engine_name: "openai-gpt",
    model_name: "gpt-4o",
  },
  prompt: "test manifest promot",
};

const fetchDummyFile = async (uid: string, fileName: string, region?: string, bucket?: string, verbose?: boolean) => {
  const response = (() => {
    if (fileName === CodeGenerationS3modelPath) {
      return stringify(manifest);
    }
    return `this is result of ${fileName}\n`;
  })();
  return new TextEncoder().encode(response);
};

test("test code_gen getCodegenPrompt", async () => {
  const uid = "uid123";
  const dataSources = [
    {
      dataType: "text" as const,
      fileName: "fileA.txt",
      text: "this is result of fileA\n",
    },
    {
      dataType: "text" as const,
      fileName: "fileB.txt",
      text: "this is result of fileB\n",
    },
  ];
  const prompt = "hello world";
  const res = await getCodegenPrompt(uid, dataSources, prompt);
  const expect = ["UID: uid123", "this is result of fileA", "this is result of fileB", "PROCESS_INPUT: hello world"].join("\n");
  assert.equal(res, expect);
});

test("test code_gen getCodegenManifest", async () => {
  const userPrompt = "";
  const codegenPrompt = ["UID: uid123", "this is result of fileA", "this is result of fileB", "PROCESS_INPUT: hello world"].join("\n");
  const res = await getCodegenManifest(fetchDummyFile, userPrompt, codegenPrompt, undefined);
  const expect = {
    title: "codeGenerator",
    model: { engine_name: "openai-gpt", model_name: "gpt-4o" },
    prompt: ["UID: uid123", "this is result of fileA", "this is result of fileB", "PROCESS_INPUT: hello world", "", `test manifest promot`].join("\n"),
  };
  assert.deepEqual(res, expect);
});

test("test code_gen getCodegenManifest with user prompt", async () => {
  const userPrompt = "hello world test";
  const codegenPrompt = ["UID: uid123", "this is result of fileA", "this is result of fileB", "PROCESS_INPUT: hello world"].join("\n");

  const res = await getCodegenManifest(fetchDummyFile, userPrompt, codegenPrompt, undefined);
  const expect = {
    title: "codeGenerator",
    model: { engine_name: "openai-gpt", model_name: "gpt-4o" },
    prompt: [
      "UID: uid123",
      "this is result of fileA",
      "this is result of fileB",
      "PROCESS_INPUT: hello world",
      "",
      "test manifest promot",
      "",
      "PROMPT FROM USER: hello world test",
    ].join("\n"),
  };
  assert.deepEqual(res, expect);
});

import { edge2input } from "../../src/utils/input";

import { initLlmAgent, updateTextAgent } from "../../src/nodes";

import test from "node:test";
import assert from "node:assert";

const sourceId = "abc";
const targetId = "123";
const edgeInputs = {
  t: [
    {
      id: "",
      source: sourceId,
      sourceHandle: "l" as const,
      target: targetId,
      targetHandle: "t" as const,
    },
  ],
};

// Text to LLM
test("test edgeInputs text to llm", async () => {
  const sourceTextAgent = updateTextAgent(sourceId, "hello", "this is test");
  const targetLlmAgent = initLlmAgent(targetId);
  targetLlmAgent.params.useUserQuery = true;

  const nodeDict = { [sourceId]: sourceTextAgent };
  const llmInputsRes = edge2input(targetLlmAgent, edgeInputs, nodeDict, true, {});

  assert.deepStrictEqual(llmInputsRes, {
    prompt: ["[Context query: ", ":userPrompt", "] [Current input: ", ":abc", "]"],
  });
});

// Text to LLM
test("test edgeInputs text to llm(useUserQuery)", async () => {
  const sourceTextAgent = updateTextAgent(sourceId, "hello", "this is test");
  const targetLlmAgent = initLlmAgent(targetId);
  targetLlmAgent.params.useUserQuery = true;

  const nodeDict = { [sourceId]: sourceTextAgent };
  const llmInputsRes = edge2input(targetLlmAgent, edgeInputs, nodeDict, true, {});

  assert.deepStrictEqual(llmInputsRes, {
    prompt: ["[Context query: ", ":userPrompt", "] [Current input: ", ":abc", "]"],
  });
});

// LLM to LLM
test("test edgeInputs llm to llm(useUserQuery)", async () => {
  const sourceLlmAgent = initLlmAgent(sourceId);
  const targetLlmAgent = initLlmAgent(targetId);
  targetLlmAgent.params.useUserQuery = true;

  const nodeDict = { [sourceId]: sourceLlmAgent };
  const llmInputsRes = edge2input(targetLlmAgent, edgeInputs, nodeDict, true, {});

  assert.deepStrictEqual(llmInputsRes, {
    prompt: ["[Context query: ", ":userPrompt", "] [Current input: ", ":abc.choices.$0.message.content", "]"],
  });
});

// LLM to LLM
test("test edgeInputs llm to llm", async () => {
  const sourceLlmAgent = initLlmAgent(sourceId);
  const targetLlmAgent = initLlmAgent(targetId);
  targetLlmAgent.params.useUserQuery = false;

  const nodeDict = { [sourceId]: sourceLlmAgent };
  const llmInputsRes = edge2input(targetLlmAgent, edgeInputs, nodeDict, true, {});

  assert.deepStrictEqual(llmInputsRes, {
    prompt: [":abc.choices.$0.message.content"],
  });
});

// LLM Image to LLM
test("test input2", async () => {
  const sourceAgent = {
    agent: "openAIImageAgent",
    params: {
      model: "dall-e-3",
      max_tokens: 500,
      temperature: 0,
      mergeableSystem: "123",
      stream: true,
      useUserQuery: true,
    },
    passThrough: {
      nodeType: "llm",
      nodeId: sourceId,
      nodeTitle: "123",
      llmType: "openAI",
    },
    isResult: true,
  };
  const targetLlmAgent = initLlmAgent(targetId);
  targetLlmAgent.params.useUserQuery = true;
  const llmInputsRes = edge2input(targetLlmAgent, edgeInputs, { [sourceId]: sourceAgent }, true, {});

  assert.deepStrictEqual(llmInputsRes, {
    images: [":abc.data.$0.url"],
    prompt: [":userPrompt"],
  });
});

import test from "node:test";
import assert from "node:assert";

import { ChunkParser } from "../../src/chunk_parser";

export const data = [
  '{"nodeId":"SnMhT1Mz-aI8DSfXU1Lg4","agentId":"groqAgent","token":"I"}{"nodeId":"SnMhT1Mz-aI8DSfXU1Lg4","agentId":"groqAgent","token":" am"}{"nodeId":"SnMhT1Mz-aI8DSfXU1Lg4","agentId":"groqAgent","token":" an"}{"nodeId":"SnMhT1Mz-aI8DSfXU1Lg4","agentId":"groqAgent","token":" AI"}{"nodeId":"SnMhT1Mz-aI8DSfXU1Lg4","agentId":"groqAgent","token":" language"}{"nodeId":"SnMhT1Mz-aI8DSfXU1Lg4","agentId":"groqAgent","token":" model"}{"nodeId":"SnMhT1Mz-aI8DSfXU1Lg4","agentId":"groqAgent","token":" and"}',
  '{"nodeId":"SnMhT1Mz-aI8DSfXU1Lg4","agentId":"groqAgent","token":" do"}',
  '{"nodeId":"SnMhT1Mz-aI8DSfXU1Lg4","agentId":"groqAgent","token":" not"}',
  '{"nodeId":"SnMhT1Mz-aI8DSfXU1Lg4","agentId":"groqAgent","token":" have"}',
  '{"nodeId":"SnMhT1Mz-aI8DSfXU1Lg4","agentId":"groqAgent","token":" personal"}',
  '{"nodeId":"SnMhT1Mz-aI8DSfXU1Lg4","agentId":"groqAgent","token":" feelings"}{"nodeId":"SnMhT1Mz-aI8DSfXU1Lg4","agentId":"groqAgent","token":" or"}{"nodeId":"SnMhT1Mz-aI8DSfXU1Lg4","agentId":"groqAgent","token":" physical"}',
  '{"nodeId":"SnMhT1Mz-aI8DSfXU1Lg4","agentId":"groqAgent","token":" health"}',
  '{"nodeId":"SnMhT1Mz-aI8DSfXU1Lg4","agentId":"groqAgent","token":"."}',
  '{"nodeId":"SnMhT1Mz-aI8DSfXU1Lg4","agentId":"groqAgent","token":" However"}',
  '{"nodeId":"SnMhT1Mz-aI8DSfXU1Lg4","agentId":"groqAgent","token":","}{"nodeId":"SnMhT1Mz-aI8DSfXU1Lg4","agentId":"groqAgent","token":" I"}',
  '{"nodeId":"SnMhT1Mz-aI8DSfXU1Lg4","agentId":"groqAgent","token":" am"}',
  '{"nodeId":"SnMhT1Mz-aI8DSfXU1Lg4","agentId":"groqAgent","token":" functioning"}',
  '{"nodeId":"SnMhT1Mz-aI8DSfXU1Lg4","agentId":"groqAgent","token":" optimally"}{"nodeId":"SnMhT1Mz-aI8DSfXU1Lg4","agentId":"groqAgent","token":" and"}{"nodeId":"SnMhT1Mz-aI8DSfXU1Lg4","agentId":"groqAgent","token":" ready"}',
  '{"nodeId":"SnMhT1Mz-aI8DSfXU1Lg4","agentId":"groqAgent","token":" to"}',
  '{"nodeId":"SnMhT1Mz-aI8DSfXU1Lg4","agentId":"groqAgent","token":" assist"}',
  '{"nodeId":"SnMhT1Mz-aI8DSfXU1Lg4","agentId":"groqAgent","token":" you"}',
  '{"nodeId":"SnMhT1Mz-aI8DSfXU1Lg4","agentId":"groqAgent","token":" with"}',
  '{"nodeId":"SnMhT1Mz-aI8DSfXU1Lg4","agentId":"groqAgent","token":" any"}{"nodeId":"SnMhT1Mz-aI8DSfXU1Lg4","agentId":"groqAgent","token":" information"}{"nodeId":"SnMhT1Mz-aI8DSfXU1Lg4","agentId":"groqAgent","token":" or"}{"nodeId":"SnMhT1Mz-aI8DSfXU1Lg4","agentId":"groqAgent","token":" task"}',
  '{"nodeId":"SnMhT1Mz-aI8DSfXU1Lg4","agentId":"groqAgent","token":" you"}{"nodeId":"SnMhT1Mz-aI8DSfXU1Lg4","agentId":"groqAgent","token":" may"}{"nodeId":"SnMhT1Mz-aI8DSfXU1Lg4","agentId":"groqAgent","token":" have"}{"nodeId":"SnMhT1Mz-aI8DSfXU1Lg4","agentId":"groqAgent","token":"."}{"nodeId":"SnMhT1Mz-aI8DSfXU1Lg4","agentId":"groqAgent","token":" How"}',
  '{"nodeId":"SnMhT1Mz-aI8DSfXU1Lg4","agentId":"groqAgent","token":" can"}{"nodeId":"SnMhT1Mz-aI8DSfXU1Lg4","agentId":"groqAgent","token":" I"}{"nodeId":"SnMhT1Mz-aI8DSfXU1Lg4","agentId":"groqAgent","token":" help"}{"nodeId":"SnMhT1Mz-aI8DSfXU1Lg4","agentId":"groqAgent","token":" you"}{"nodeId":"SnMhT1Mz-aI8DSfXU1Lg4","agentId":"groqAgent","token":" today"}{"nodeId":"SnMhT1Mz-aI8DSfXU1Lg4","agentId":"groqAgent","token":"?"}',

  '{"nodeId":"Spt70AniRPl6FEok-oWIP","agentId":"openAIAgent","token":"Hello"}{"nodeId":"Spt70AniRPl6FEok-oWIP","agentId":"openAIAgent","token":"!"}{"nodeId":"Spt70AniRPl6FEok-oWIP","agentId":"openAIAgent","token":" I\'m"}{"nodeId":"Spt70AniRPl6FEok-oWIP","agentId":"openAIAgent","token":" just"}{"nodeId":"Spt70AniRPl6FEok-oWIP","agentId":"openAIAgent","token":" a"}{"nodeId":"Spt70AniRPl6FEok-oWIP","agentId":"openAIAgent","token":" computer"}',
  '{"nodeId":"Spt70AniRPl6FEok-oWIP","agentId":"openAIAgent","token":" program"}{"nodeId":"Spt70AniRPl6FEok-oWIP","agentId":"openAIAgent","token":","}',
  '{"nodeId":"Spt70AniRPl6FEok-oWIP","agentId":"openAIAgent","token":" so"}{"nodeId":"Spt70AniRPl6FEok-oWIP","agentId":"openAIAgent","token":" I"}{"nodeId":"Spt70AniRPl6FEok-oWIP","agentId":"openAIAgent","token":" don\'t"}{"nodeId":"Spt70AniRPl6FEok-oWIP","agentId":"openAIAgent","token":" have"}{"nodeId":"Spt70AniRPl6FEok-oWIP","agentId":"openAIAgent","token":" feelings"}{"nodeId":"Spt70AniRPl6FEok-oWIP","agentId":"openAIAgent","token":","}',
  '{"nodeId":"Spt70AniRPl6FEok-oWIP","agentId":"openAIAgent","token":" but"}{"nodeId":"Spt70AniRPl6FEok-oWIP","agentId":"openAIAgent","token":" I\'m"}{"nodeId":"Spt70AniRPl6FEok-oWIP","agentId":"openAIAgent","token":" here"}',
  '{"nodeId":"Spt70AniRPl6FEok-oWIP","agentId":"openAIAgent","token":" and"}{"nodeId":"Spt70AniRPl6FEok-oWIP","agentId":"openAIAgent","token":" ready"}',
  '{"nodeId":"Spt70AniRPl6FEok-oWIP","agentId":"openAIAgent","token":" to"}{"nodeId":"Spt70AniRPl6FEok-oWIP","agentId":"openAIAgent","token":" help"}',
  '{"nodeId":"Spt70AniRPl6FEok-oWIP","agentId":"openAIAgent","token":" you"}{"nodeId":"Spt70AniRPl6FEok-oWIP","agentId":"openAIAgent","token":"."}',
  '{"nodeId":"Spt70AniRPl6FEok-oWIP","agentId":"openAIAgent","token":" How"}{"nodeId":"Spt70AniRPl6FEok-oWIP","agentId":"openAIAgent","token":" can"}',
  '{"nodeId":"Spt70AniRPl6FEok-oWIP","agentId":"openAIAgent","token":" I"}{"nodeId":"Spt70AniRPl6FEok-oWIP","agentId":"openAIAgent","token":" assist"}',
  '{"nodeId":"Spt70AniRPl6FEok-oWIP","agentId":"openAIAgent","token":" you"}{"nodeId":"Spt70AniRPl6FEok-oWIP","agentId":"openAIAgent","token":" today"}',
  '{"nodeId":"Spt70AniRPl6FEok-oWIP","agentId":"openAIAgent","token":"?"}',
  '___END___{"SnMhT1Mz-aI8DSfXU1Lg4":{"id":"chatcmpl-3bad958d-2ce4-4ad0-b835-70f026c738c0","object":"chat.completion.chunk","created":1721949770,"model":"gemma-7b-it","system_fingerprint":"fp_e3b292b95f","choices":[{"index":0,"delta":{},"logprobs":null,"finish_reason":"stop","message":{"role":"assistant","content":"I am an AI language model and do not have personal feelings or physical health. However, I am functioning optimally and ready to assist you with any information or task you may have. How can I help you today?"}}],"x_groq":{"id":"req_01j3p38mcbfr8sg6cjkk3asyve","usage":{"queue_time":0.023729751,"prompt_tokens":27,"prompt_time":0.016609814,"completion_tokens":44,"completion_time":0.050896742,"total_tokens":71,"total_time":0.067506556}}},"SbYxBE178iHOhV_Plli96":{"choices":[{"message":{"role":"assistant","content":"\\n\\nI\'m excited to help! Please go ahead and provide the text you\'d like me to summarize. I\'ll condense it into a 100-word summary for you."}}]},"fkLxu8TeJZ6WwMqGDEKY1":"You\'ll be given some text. Summarize the text you\'ve been given into a 100 word summary.","Spt70AniRPl6FEok-oWIP":{"object":"chat.completion","id":"chatcmpl-9p25Kf5mdplXXWaw9AwGwQeQ2dt8p","choices":[{"message":{"role":"assistant","content":"Hello! I\'m just a computer program, so I don\'t have feelings, but I\'m here and ready to help you. How can I assist you today?"},"finish_reason":"stop","index":0,"logprobs":null}],"created":1721949770,"model":"gpt-4o-2024-05-13","system_fingerprint":"fp_18cc0f1fa0"},"userPrompt":"hello how are you?"}',
];

test("test stream parser", async () => {
  const parser = new ChunkParser();
  const res: Record<string, string[]> = {
    "Spt70AniRPl6FEok-oWIP": [""],
    "SnMhT1Mz-aI8DSfXU1Lg4": [""],
  };
  data.forEach((chunk) => {
    const rets = parser.read(chunk);
    rets.forEach((ret: { nodeId: string; token?: string; agentId: string }) => {
      if (ret.token) {
        res[ret.nodeId].push(ret.token);
      }
    });
  });
  assert.equal(
    res["Spt70AniRPl6FEok-oWIP"].join(""),
    "Hello! I'm just a computer program, so I don't have feelings, but I'm here and ready to help you. How can I assist you today?"
  );
  assert.equal(
    res["SnMhT1Mz-aI8DSfXU1Lg4"].join(""),
    "I am an AI language model and do not have personal feelings or physical health. However, I am functioning optimally and ready to assist you with any information or task you may have. How can I help you today?"
  );

  const result = parser.result();
  // console.log("RESULT");
  assert.equal(result["userPrompt"], "hello how are you?");
});

test("test stream parser", async () => {
  const parser = new ChunkParser();

  const messages = [
    '{"nodeId":"4sWmxORLj6Nzow9X0b9Ux","agentId":"openAIAgent","token":" you"}{"nodeId":"4sWmxORLj6Nzow9X0b9Ux","agentId":"openAIAgent","token":" today"}{"nodeId":"4sWmxORLj6Nzow9X0b9Ux","agentId":"openAIAgent","token":"?\\""}___END___{"LFsAiJrTiNUj3bVviTJOx":{"object":"chat.completion","id":"chatcmpl-ABoiEkYuZU2r1o3TURVUwNoDJc5mM","choices":[{"message":{"role":"assistant","content":"Hello! How can I assist you today?","refusal":null,"parsed":null,"tool_calls":[]},"finish_reason":"stop","index":0,"logprobs":null}],"created":1727379910,"model":"gpt-4o-2024-05-13","system_fingerprint":"fp_057232b607","text":"Hello! How can I assist you today?","nodeType":"openAI","nodeId":"LFsAiJrTiNUj3bVviTJOx","nodeTitle":"Chat"},"4sWmxORLj6Nzow9X0b9Ux":{"object":"chat.completion","id":"chatcmpl-ABoiE3bD0uX9j07ReJlT53Ut33vgS","choices":[{"message":{"role":"assistant","content":"The user greeted with "hello 123," and the assistant responded with "Hello! How can I assist you today?"","refusal":null,"parsed":null,"tool_calls":[]},"finish_reason":"stop","index":0,"logprobs":null}],"created":1727379910,"model":"gpt-4o-2024-05-13","system_fingerprint":"fp_52a7f40b0b","text":"The user greeted with "hello 123," and the assistant responded with "Hello! How can I assist you today?"","nodeType":"openAI","nodeId":"4sWmxORLj6Nzow9X0b9Ux","nodeTitle":"Summarize"}}',
  ];
  messages.map((message) => {
    const res = parser.read(message);

    assert.deepEqual(res, [
      {
        nodeId: "4sWmxORLj6Nzow9X0b9Ux",
        agentId: "openAIAgent",
        token: " you",
      },
      {
        nodeId: "4sWmxORLj6Nzow9X0b9Ux",
        agentId: "openAIAgent",
        token: " today",
      },
      {
        nodeId: "4sWmxORLj6Nzow9X0b9Ux",
        agentId: "openAIAgent",
        token: '?"',
      },
    ]);
  });
});

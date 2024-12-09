export const expectDemoData = {
  version: 0.5,
  nodes: {
    userPrompt: {
      value: "Please tell me about particle physics in 1000 words.",
    },
    LFsAiJrTiNUj3bVviTJOx: {
      agent: "openAIAgent",
      inputs: {
        prompt: [":userPrompt"],
      },
      params: {
        model: "gpt-4o",
        max_tokens: 500,
        temperature: 0,
        mergeableSystem: "You are a helpful chat assistant",
        stream: true,
        useUserQuery: true,
      },
      passThrough: {
        nodeType: "llm",
        nodeId: "LFsAiJrTiNUj3bVviTJOx",
        nodeTitle: "Chat",
        llmType: "openAI",
      },
      isResult: true,
    },
    "4sWmxORLj6Nzow9X0b9Ux": {
      agent: "openAIAgent",
      inputs: {
        prompt: ["[Context query: ", ":userPrompt", "] [Current input: ", ":LFsAiJrTiNUj3bVviTJOx.choices.$0.message.content", "]"],
      },
      params: {
        model: "gpt-4o",
        max_tokens: 500,
        temperature: 0,
        mergeableSystem:
          "You are a text summarization agent. If the user provides any instructions you must follow them, otherwise summarize any text that is provided to you.",
        stream: true,
        useUserQuery: true,
      },
      passThrough: {
        nodeType: "llm",
        nodeId: "4sWmxORLj6Nzow9X0b9Ux",
        nodeTitle: "Summarize",
        llmType: "openAI",
      },
      isResult: true,
    },
  },
};

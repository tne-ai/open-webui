export const expectLlmEndpoint = {
  version: 0.5,
  nodes: {
    YwyoBpBgmahSxZnl4kX9M: {
      agent: "groqAgent",
      params: { model: "llama3-70b-8192", max_tokens: 500, temperature: 0, mergeableSystem: "You are a helpful chat assistant.\n", stream: true },
      inputs: { prompt: [":userPrompt"] },
      passThrough: { nodeType: "groq", nodeId: "YwyoBpBgmahSxZnl4kX9M", nodeTitle: "Groq" },
      isResult: true,
    },
    haP6HNEZAsubMsV1glCaZ: {
      agent: "replicateAgent",
      params: { model: "meta/meta-llama-3-70b-instruct", max_tokens: 500, temperature: 0, mergeableSystem: "Summarize the text you're given.\n", stream: true },
      inputs: {
        prompt: ["[Context query: ", ":userPrompt", "] [Current input: ", ":YwyoBpBgmahSxZnl4kX9M.choices.$0.message.content", ":XyPttdR3rwuPBi8vzP5v6", "]"],
      },
      passThrough: { nodeType: "replicate", nodeId: "haP6HNEZAsubMsV1glCaZ", nodeTitle: "Replicate" },
      isResult: true,
    },
    XyPttdR3rwuPBi8vzP5v6: { value: "250 word summary" },
    cWnxjsYMAlzxHV5rhh5BX: {
      agent: "anthropicAgent",
      params: { model: "claude-3-haiku-20240307", max_tokens: 500, temperature: 0, mergeableSystem: "Summarize the text given to you.\n", stream: true },
      inputs: {
        prompt: ["[Context query: ", ":userPrompt", "] [Current input: ", ":ltP1LJe865TRx_VQrFTHh", ":haP6HNEZAsubMsV1glCaZ.choices.$0.message.content", "]"],
      },
      passThrough: { nodeType: "anthropic", nodeId: "cWnxjsYMAlzxHV5rhh5BX", nodeTitle: "Anthropic" },
      isResult: true,
    },
    ltP1LJe865TRx_VQrFTHh: { value: "100 word summary" },
    userPrompt: { value: "write a 500 word essay on trains" },
  },
};

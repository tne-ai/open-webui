export const graphChat = {
  version: 0.5,
  nodes: {
    chatHistory: {
      value: []
    },
    llmEngine: {
      value: ""
    },
    llm: {
      agent: ":llmEngine",
      isResult: true,
      inputs: { messages: ":chatHistory" },
      console: true
    },
  },
};
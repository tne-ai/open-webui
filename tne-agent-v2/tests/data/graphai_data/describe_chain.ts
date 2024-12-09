export const expectDescribeChain = {
  version: 0.5,
  nodes: {
    imauvJ951viIxIEEbCHRy: {
      agent: "openAIImageAgent",
      params: {
        model: "dall-e-3",
        max_tokens: 500,
        temperature: 0,
        mergeableSystem: "Generate an image pertaining to the user input given to you\n",
        stream: true,
      },
      inputs: { prompt: [":WzvkRpzZFhawZ53j2hkyq"] },
      passThrough: { nodeType: "openAIImage", nodeId: "imauvJ951viIxIEEbCHRy", nodeTitle: "Artist" },
      isResult: true,
    },
    WzvkRpzZFhawZ53j2hkyq: { value: "Cat in the hat" },
    "RgfMObdBbR-5LHFnhdZHg": {
      agent: "openAIAgent",
      params: { model: "gpt-4-vision-preview", max_tokens: 500, temperature: 0, mergeableSystem: "Describe the given image(s)\n", stream: true },
      inputs: { images: [":imauvJ951viIxIEEbCHRy.data.$0.url"], prompt: [] },
      isResult: true,
      passThrough: { nodeType: "openAI", nodeId: "RgfMObdBbR-5LHFnhdZHg", nodeTitle: "Describe" },
    },
  },
};

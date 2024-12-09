export const expectCSVDemo = {
  version: 0.5,
  nodes: {
    wptBCRQ45PcxyGGiFekym: {
      agent: "s3FileAgent",
      params: {
        fileName: "retail_highlight_shopping_list_no_periods.csv",
      },
      passThrough: { nodeType: "file", nodeId: "wptBCRQ45PcxyGGiFekym" },
      inputs: {},
    },
    V5bviE7nrD5RvcgMXpUft: {
      agent: "groqAgent",
      params: {
        model: "Llama-3-70B-Instruct",
        max_tokens: 500,
        temperature: 0,
        mergeableSystem: "You are a helpful chat assistant\n",
        stream: true,
      },
      inputs: {
        file: [":wptBCRQ45PcxyGGiFekym"],
        prompt: [":userPrompt"],
      },
      isResult: true,
      passThrough: { nodeType: "groq", nodeId: "V5bviE7nrD5RvcgMXpUft", nodeTitle: "Retail Q/A" },
    },
    userPrompt: {
      value: "Which product has the highest gross margin?",
    },
  },
};

export const expectRag = {
  version: 0.5,
  nodes: {
    "0fJTMuuy4b7dCFjK2qoH2": {
      agent: "ragAgent",
      params: { ragDbName: "rag_v2_rich_papers" },
      inputs: { array: [":X8KFG5MBOPXrnjIu-9K8l"] },
      isResult: true,
      passThrough: {
        nodeType: "rag",
        nodeId: "0fJTMuuy4b7dCFjK2qoH2",
      },
    },
    "X8KFG5MBOPXrnjIu-9K8l": { value: "What is Alex Tong's research niche? " },
  },
};

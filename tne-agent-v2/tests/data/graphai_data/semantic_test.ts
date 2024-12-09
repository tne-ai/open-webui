export const expectSemantic = {
  version: 0.5,
  nodes: {
    "X8KFG5MBOPXrnjIu-9K8l": { value: "What is Alex Tong's research niche? " },
    TDQJpdt4Fe5X8KNU9ooT4: {
      isResult: true,
      agent: "semanticAgent",
      params: { semanticDbName: "rag_v2_rich_papers", maxEmbeddings: 10, similarityThreshold: 0.8 },
      inputs: {
        array: [":X8KFG5MBOPXrnjIu-9K8l"],
      },
      passThrough: { nodeType: "semantic", nodeId: "TDQJpdt4Fe5X8KNU9ooT4" },
    },
  },
};

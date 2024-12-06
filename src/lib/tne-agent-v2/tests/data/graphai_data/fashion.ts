export const expectFashion = {
  version: 0.5,
  nodes: {
    "EJVuxYpDuSNJxjJb-nSmp": {
      agent: "openAIAgent",
      params: {
        model: "gpt-4-vision-preview",
        max_tokens: 500,
        temperature: 0,
        mergeableSystem: "Describe the fashion of anybody depicted in the images you're given.\n",
        stream: true,
      },
      inputs: { file: [":iBWAtmiXifH79EdTOl2gs", ":5JskYC_J_k8ja0EIDPvDw", ":6P8IDnDHZeI3xjthF_z8R"], prompt: [] },
      passThrough: { nodeType: "openAI", nodeId: "EJVuxYpDuSNJxjJb-nSmp", nodeTitle: "Fashion" },
      isResult: true,
    },
    "5JskYC_J_k8ja0EIDPvDw": {
      agent: "s3FileAgent",
      params: { fileName: "hipster1.jpeg" },
      inputs: {},
      passThrough: { nodeType: "file", nodeId: "5JskYC_J_k8ja0EIDPvDw" },
    },
    "6P8IDnDHZeI3xjthF_z8R": {
      agent: "s3FileAgent",
      params: { fileName: "hipster2.jpeg" },
      inputs: {},
      passThrough: { nodeType: "file", nodeId: "6P8IDnDHZeI3xjthF_z8R" },
    },
    iBWAtmiXifH79EdTOl2gs: {
      agent: "s3FileAgent",
      params: { fileName: "hipster3.jpeg" },
      inputs: {},
      passThrough: { nodeType: "file", nodeId: "iBWAtmiXifH79EdTOl2gs" },
    },
  },
};

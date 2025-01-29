export const Chat = {
  version: 0.5,
  nodes: {
    chatHistory: {
      value: []
    },
    llmEngine: {
      value: ""
    },
    requestBody: {
      value: {}
    },
    token: {
      value: "",
    },
    url: {
      value: "",
    },
    socket: {
      value: null,
    },
    openwebui: {
      agent: "openWebuiAgent",
      params: {
        token: ":token",
        body: ":requestBody",
        url: ":url",
      },
    },
    llm: {
      agent: ":llmEngine",
      inputs: {
        prompt: ":openwebui.data",
        system: "Give the input back verbatim"
      },
      isResult: true
    }
  },
};
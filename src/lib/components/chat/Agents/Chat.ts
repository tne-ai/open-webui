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
    openwebui: {
      agent: "openWebuiAgent",
      params: {
        token: ":token",
        body: ":requestBody",
        base_url: ":url",
      },
      isResult: true,
      console: true
    }
  },
};
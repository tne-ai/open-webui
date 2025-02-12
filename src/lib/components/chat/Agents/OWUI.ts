export const OWUI = {
  version: 0.5,
  nodes: {
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
        stream: true
      },
      isResult: true,
    }
  }
};

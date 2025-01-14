export const Generator = {
  version: 0.5,
  nodes: {
    chatHistory: {
      value: []
    },
    llmEngine: {
      value: ""
    },
    fetchAPI: {
      agent: ":llmEngine",
      inputs: {
        messages: ":chatHistory",
        system: "You are capable of either returning True or False. Return True if the user is asking for information which would require external knowledge, and False otherwise."
      },
    },
    checkAPICallNeeded: {
      agent: "compareAgent",
      inputs: { array: [":fetchAPI.text", "!=", "False"] }
    },
    conversationLLM: {
      agent: ":llmEngine",
      inputs: {
        system: "You are a helpful chat assistant with an expertise in DTC consumer fashion.",
        messages: ":chatHistory"
      },
      unless: ":checkAPICallNeeded",
      isResult: true
    },
    document: {
      agent: "fetchAgent",
      console: {
        before: "...fetching document",
      },
      params: {
        type: "text",
      },
      inputs: { url: "https://raw.githubusercontent.com/receptron/graphai/main/packages/graphai/README.md" },
    },
    sampleGraph: {
      agent: "fetchAgent",
      params: {
        type: "text",
      },
      inputs: { url: "https://raw.githubusercontent.com/receptron/graphai/refs/heads/main/packages/samples/src/net/weather.ts" },
    },
    graphGenerator: {
      // Generates a graph for an AI agent to acquire specified information from the user.
      agent: ":llmEngine",
      if: ":checkAPICallNeeded",
      inputs: {
        messages: ":chatHistory",
        system: ["You an expert in GraphAI programming. You are responsible in generating a graphAI graph to answer the user question. Always store the results in a node called 'output', with isResult set to true.\n",
                 "graphAI graph outputs in json format\n",
                 "[documentation of GraphAI]\n${:document}",
                 "[sample graph]\n\```json\\n${:sampleGraph}\\n```\\n",
                 "For weather, directly input the latitude/longitude into the GraphAI graph you write"
                ]
      },
      params: {
        temperature: 0
      },
      isResult: true
    },
    execute: {
      // Execute that AI Agent
      if: ":checkAPICallNeeded",
      agent: "nestedAgent",
      graph: ":graphGenerator.text.codeBlock().jsonParse()",
    },
    summarize: {
      agent: ":llmEngine",
      if: ":checkAPICallNeeded",
      inputs: {
        messages: ":chatHistory",
        system: ["Output to summarize:\n\n", ":execute.output", "Instructions\n\n", "Succinctly summarize the data you've received to answer the user question in the chat history."]
      },
      isResult: true
    }
  },
};
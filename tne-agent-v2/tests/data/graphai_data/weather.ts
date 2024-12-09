const tools = [
  {
    type: "function",
    function: {
      name: "getWeather",
      description: "get weather information of the specified location",
      parameters: {
        type: "object",
        properties: {
          latitude: {
            type: "number",
            description: "The latitude of the location.",
          },
          longitude: {
            type: "number",
            description: "The longitude of the location.",
          },
        },
        required: ["latitude", "longitude"],
      },
    },
  },
];

const graph_tool = {
  nodes: {
    outputFetching: {
      // Displays the fetching message.
      agent: "stringTemplateAgent",
      inputs: { text: "... fetching weather info: ${:parent_tool.arguments.latitude}, ${:parent_tool.arguments.longitude}" },
      console: {
        after: true,
      },
    },
    fetchPoints: {
      // Fetches the "grid location" from the URL.
      agent: "fetchAgent",
      // Builds a URL to fetch the "grid location" from the spcified latitude and longitude
      inputs: {
        url: "https://api.weather.gov/points/${:parent_tool.arguments.latitude},${:parent_tool.arguments.longitude}",
        headers: { "User-Agent": "(receptron.org)" },
      },
    },
    fetchForecast: {
      // Fetches the weather forecast for that location.
      agent: "fetchAgent",
      params: {
        type: "text",
      },
      inputs: { url: ":fetchPoints.properties.forecast", headers: { "User-Agent": "(receptron.org)" } },
      unless: ":fetchPoints.onError",
    },
    extractError: {
      // Extract error title and detail
      agent: "stringTemplateAgent",
      inputs: { text: "${:fetchPoints.onError.error.title}: ${:fetchPoints.onError.error.detail}" },
      if: ":fetchPoints.onError",
    },
    responseText: {
      // Extract the forecast and error
      agent: "copyAgent",
      anyInput: true,
      inputs: { array: [":fetchForecast", ":extractError"] },
    },
    messagesWithToolRes: {
      // Appends that message to the messages.
      agent: "pushAgent",
      inputs: {
        array: ":parent_messages",
        item: {
          role: "tool",
          tool_call_id: ":parent_tool.id",
          name: ":parent_tool.name",
          content: ":responseText.array.$0",
        },
      },
    },
    llmCall: {
      // Sends those messages to LLM to get the answer.
      agent: "openAIAgent",
      inputs: { messages: ":messagesWithToolRes.array" },
      params: { stream: false }
    },
    output: {
      // Displays the response to the user.
      agent: "stringTemplateAgent",
      inputs: { text: "Weather: ${:llmCall.text}" },
      console: {
        after: true,
      },
    },
    messagesWithSecondRes: {
      // Appends the response to the messages.
      agent: "pushAgent",
      inputs: { array: ":messagesWithToolRes.array", item: ":llmCall.message" },
      isResult: true,
    },
  },
};

export const graphData= {
  version: 0.5,
  nodes: {
    messages: {
      // Holds the conversation, array of messages.
      value: [{ role: "system", content: "You are a meteorologist. Use getWeather API, only when the user ask for the weather information." }],
      update: ":reducer.array.$0",
      isResult: true,
    },
    userPrompt: {
      value: "What is the weather today in NYC?"
    },
    llmCall: {
      // Sends those messages to LLM to get the answer.
      agent: "openAIAgent",
      params: {
        tools,
        stream: true
      },
      inputs: { messages: ":messages", prompt: [":userPrompt"] },
    },
    output: {
      // Displays the response to the user.
      agent: "stringTemplateAgent",
      inputs: { text: "Weather: ${:llmCall.text}" },
      console: {
        after: true,
      },
      if: ":llmCall.text",
    },
    messagesWithFirstRes: {
      // Appends the response to the messages.
      agent: "pushAgent",
      inputs: {
        array: ":messages",
        items: [":llmCall.message"],
      },
    },
    tool_calls: {
      // This node is activated if the LLM requests a tool call.
      agent: "nestedAgent",
      inputs: { parent_messages: ":messagesWithFirstRes.array", parent_tool: ":llmCall.tool" },
      if: ":llmCall.tool",
      graph: graph_tool,
    },
    no_tool_calls: {
      // This node is activated only if this is a normal response (not a tool call).
      agent: "copyAgent",
      unless: ":llmCall.tool",
      inputs: { result: ":messagesWithFirstRes.array" },
    },
    reducer: {
      // Receives messages from either case.
      agent: "copyAgent",
      anyInput: true,
      inputs: { array: [":no_tool_calls.result", ":tool_calls.messagesWithSecondRes.array"] },
    },
  },
};
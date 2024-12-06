export const expectJury = {
  version: 0.5,
  nodes: {
    "dBvi6HXDz-fh7rU3_xDMG": {
      agent: "groqAgent",
      params: {
        model: "mixtral-8x7b-32768",
        max_tokens: 500,
        temperature: 0,
        mergeableSystem:
          "You are a helpful chat assistant using the model groq-mixtral-8x7b-32768. Output your response like:\n\nModel name: `groq-mixtral-8x7b-327682`\nResponse: {your response}\n",
        stream: true,
      },
      inputs: { prompt: [":userPrompt"] },
      isResult: true,
      passThrough: { nodeType: "groq", nodeId: "dBvi6HXDz-fh7rU3_xDMG", nodeTitle: "Groq Mixtral" },
    },
    "5izJLYjhd8RGuJPaJpxxJ": {
      agent: "groqAgent",
      params: { model: "llama3-70b-8192", max_tokens: 500, temperature: 0, mergeableSystem: "You are a helpful chat assistant.\n", stream: true },
      inputs: { prompt: [":userPrompt"] },
      isResult: true,
      passThrough: { nodeType: "groq", nodeId: "5izJLYjhd8RGuJPaJpxxJ", nodeTitle: "Groq Llama" },
    },
    ifPkRRyLnlcDcdltD61hk: {
      agent: "replicateAgent",
      params: { model: "meta/meta-llama-3-70b-instruct", max_tokens: 500, temperature: 0, mergeableSystem: "Summarize the text you're given.\n", stream: true },
      inputs: { prompt: [":userPrompt"] },
      isResult: true,
      passThrough: { nodeType: "replicate", nodeId: "ifPkRRyLnlcDcdltD61hk", nodeTitle: "Replicate Llama" },
    },
    "6y29e1rAtP3fjXjuQS5AJ": {
      agent: "openAIAgent",
      params: {
        model: "gpt-4-0125-preview",
        max_tokens: 500,
        temperature: 0,
        mergeableSystem:
          "You'll be given several different responses from different LLMs. For each response, you must output it verbatim, assign a confidence score for its accuracy and explain your reasoning behind the score you gave. Follow the format template below, brackets indicate what you should fill in.\n\nModel Name: {LLM 1 NAME}\n\n{LLM 1 VERBATIM RESPONSE}\n\nScore\n{YOUR SCORE}\n\nReasoning\n{YOUR EXPLANATION FOR THE SCORE}\n\n...\n\nModel Name: {LLM NAME}\n\n{LLM N VERBATIM RESPONSE}\n\nScore\n{YOUR SCORE}\n\nReasoning\n{YOUR EXPLANATION FOR THE SCORE}",
        stream: true,
      },
      inputs: {
        prompt: [
          "[Context query: ",
          ":userPrompt",
          "] [Current input: ",
          ":ifPkRRyLnlcDcdltD61hk.choices.$0.message.content",
          ":dBvi6HXDz-fh7rU3_xDMG.choices.$0.message.content",
          ":5izJLYjhd8RGuJPaJpxxJ.choices.$0.message.content",
          "]",
        ],
      },
      passThrough: { nodeType: "openAI", nodeId: "6y29e1rAtP3fjXjuQS5AJ", nodeTitle: "Judge" },
      isResult: true,
    },
    userPrompt: { value: "who is Bruce Springsteen?" },
  },
};

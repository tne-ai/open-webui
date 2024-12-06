export const expectNestedData = {
  version: 0.5,
  nodes: {
    dlbCOembbRESraiTrIuTi: {
      agent: "openAIAgent",
      params: {
        model: "gpt-4o",
        max_tokens: 500,
        temperature: 0,
        mergeableSystem:
          "You are a text summarization agent. If the user provides any instructions you must follow them, otherwise summarize any text that is provided to you.",
        stream: true,
        useUserQuery: false,
      },
      passThrough: {
        nodeType: "llm",
        nodeId: "dlbCOembbRESraiTrIuTi",
        nodeTitle: "Summarize",
        llmType: "openAI",
      },
      isResult: true,
      inputs: {
        prompt: [":3R4NZNO_bPobKW3kFCsLh.kvbe0SfqKzxeDHjWd9LnP.data"],
      },
    },
    "3R4NZNO_bPobKW3kFCsLh": {
      agent: "nestedAgent",
      graph: {
        version: 0.5,
        nodes: {
          dzUmgSK1LWJ6cWwC55pM8: {
            agent: "nestedAgent",
            params: {
              useUserQuery: true,
            },
            graph: {
              version: 0.5,
              nodes: {
                dzUmgSK1LWJ6cWwC55pM8_codeGeneration: {
                  agent: "codeGenerationTemplateAgent",
                  params: {
                    prompt: "Return the results as a pd.DataFrame.",
                  },
                  passThrough: {
                    nodeType: "codeGeneration_template",
                    nodeId: "dzUmgSK1LWJ6cWwC55pM8_codeGeneration",
                    nodeTitle: "Generate Code",
                  },
                  inputs: {
                    file: ":file",
                    inputs: ":inputs",
                    userPrompt: ":userPrompt",
                  },
                },
                dzUmgSK1LWJ6cWwC55pM8_llm: {
                  agent: "openAIAgent",
                  params: {
                    model: "gpt-4o",
                    max_tokens: 500,
                    temperature: 0,
                    stream: false,
                    useUserQuery: false,
                  },
                  passThrough: {
                    nodeType: "llm",
                    nodeTitle: "New Model",
                    nodeId: "dzUmgSK1LWJ6cWwC55pM8_llm",
                    llmType: "openAI",
                  },
                  isResult: true,
                  inputs: {
                    prompt: ":dzUmgSK1LWJ6cWwC55pM8_codeGeneration.prompt",
                    model: ":dzUmgSK1LWJ6cWwC55pM8_codeGeneration.model",
                    system: ":dzUmgSK1LWJ6cWwC55pM8_codeGeneration.system",
                    temperature: ":dzUmgSK1LWJ6cWwC55pM8_codeGeneration.temperature",
                    max_tokens: ":dzUmgSK1LWJ6cWwC55pM8_codeGeneration.max_tokens",
                  },
                },
                dzUmgSK1LWJ6cWwC55pM8_python: {
                  agent: "pythonCodeAgent",
                  params: {},
                  passThrough: {
                    nodeType: "python_code",
                    nodeId: "dzUmgSK1LWJ6cWwC55pM8_python",
                    nodeTitle: "Generate Code",
                  },
                  isResult: true,
                  inputs: {
                    code: ":dzUmgSK1LWJ6cWwC55pM8_llm.choices.$0.message.content",
                  },
                },
              },
            },
            passThrough: {
              nodeType: "code_generation",
              nodeId: "dzUmgSK1LWJ6cWwC55pM8",
              nodeTitle: "Generate Code",
            },
            isResult: true,
            inputs: {
              file: [],
              inputs: [],
              userPrompt: ":userPrompt",
            },
          },
          kvbe0SfqKzxeDHjWd9LnP: {
            agent: "pythonCodeAgent",
            params: {
              module: "chat_markdown.py",
              outputType: "overwrite",
              code: 'import pandas as pd \n\nfrom tne.TNE import TNE\nfrom tabulate import tabulate\n\n\nif __name__ == "__main__":\n    if type(PROCESS_INPUT) is pd.DataFrame:\n        if PROCESS_INPUT.empty:\n            result = "<EMPTY DATAFRAME>"\n        else:\n            result = tabulate(PROCESS_INPUT, headers="keys", tablefmt="pipe", showindex=False)\n    elif type(PROCESS_INPUT) is str:\n        result = PROCESS_INPUT \n    else:\n        result = "<ERROR>" ',
            },
            passThrough: {
              nodeType: "python_code",
              nodeId: "dbD-XbCmTlvAnkg7X_HRW",
              nodeTitle: "Chat Markdown",
            },
            isResult: true,
            inputs: {
              data: [":dzUmgSK1LWJ6cWwC55pM8.dzUmgSK1LWJ6cWwC55pM8_python"],
            },
          },
          userPrompt: {
            value: "what are the first 10 fibonacci numbers?",
          },
        },
      },
      params: {
        graphDataFile: "Create Dataframe",
        outputType: "overwrite",
      },
      passThrough: {
        nodeType: "nested",
        nodeId: "3R4NZNO_bPobKW3kFCsLh",
        nodeTitle: "Create DataFrame",
      },
      isResult: true,
      inputs: {},
    },
    userPrompt: {
      value: "what are the first 10 fibonacci numbers?",
    },
  },
};

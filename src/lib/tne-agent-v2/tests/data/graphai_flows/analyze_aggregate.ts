export const analysisAggregateFlow = {
  version: 0.5,
  nodes: {
    userPrompt: {
      value: "What are the top 2 crossbody bags?",
    },
    csvData: {
      agent: "s3FileAgent",
      params: {
        fileName: "retail_highlight_shopping_list_no_periods.csv",
      },
      inputs: {},
    },
    runCodeGen: {
      agent: "openAIAgent",
      inputs: {
        prompt: ":userPrompt",
        system: "You are capable of either returning True or False. You are part of a larger system that has access to a dataset containing product information and sales data for DTC goods. Return True if the question you receive is likely related to specific information in this dataset (e.g product attributes, sales figures). Otherwise, if just asking for some general field, like a definition or some other question, return False."
      },
    },
    checkInput: {
      agent: "compareAgent",
      inputs: { array: [":runCodeGen.text", "!=", "False"] },
    },
    conversationLLM: {
      agent: "openAIAgent",
      inputs: {
        prompt: ":userPrompt",
        system: "You are a helpful chat assistant with an expertise in DTC consumer fashion."
      },
      unless: ":checkInput",
      isResult: true,
    },
    codeGenerator: {
      agent: "nestedAgent",
      if: ":checkInput",
      graph: {
        version: 0.5,
        nodes: {
          codeGenerator_inputFiles: {
            agent: "codeGenerationTemplateAgent",
            params: {
              prompt: "Return the results as a pd.DataFrame.",
            },
            inputs: {
              file: ":file",
              inputs: ":inputs",
              userPrompt: ":userPrompt",
            },
          },
          codeGenerator_llm_openai: {
            agent: "openAIAgent",
            params: {
              model: "gpt-4o",
              max_tokens: 4096,
            },
            inputs: {
              prompt: ":codeGenerator_inputFiles.prompt",
              system: ":codeGenerator_inputFiles.system",
              temperature: ":codeGenerator_inputFiles.temperature",
              max_tokens: ":codeGenerator_inputFiles.max_tokens",
            },
          },
          codeGenerator_llm_groq: {
            agent: "groqAgent",
            params: {
              model: "llama3-70b-8192",
            },
            inputs: {
              prompt: ":codeGenerator_inputFiles.prompt",
              system: ":codeGenerator_inputFiles.system",
              temperature: ":codeGenerator_inputFiles.temperature",
              max_tokens: ":codeGenerator_inputFiles.max_tokens",
            },
          },
          codeGenerator_llm_anthropic: {
            agent: "anthropicAgent",
            inputs: {
              prompt: ":codeGenerator_inputFiles.prompt",
              system: ":codeGenerator_inputFiles.system",
              temperature: ":codeGenerator_inputFiles.temperature",
              max_tokens: ":codeGenerator_inputFiles.max_tokens",
            },
          },
          codeGenerator_aggregator: {
            agent: "openAIAgent",
            inputs: {
              prompt: [
                  ":userPrompt",
                  ":codeGenerator_llm_openai.text",
                  ":codeGenerator_llm_groq.text",
                  ":codeGenerator_llm_anthropic.text"
              ],
              system: "You are an expert in data analysis and Python code. You will be given a list of Python code snippets, as well as a user query. Your job is to output Python code that correctly answers the user query, either by picking a correct code snippet, or using parts in one aggregate code snippet. Do NOT change the methods of data access, column names, or any other specific details. Only edit code structure of filtering logic. Remember imports, and do not output ANYTHING except for Python code."
            },
          },
          codeGenerator_python: {
            agent: "pythonCodeAgent",
            params: {},
            inputs: {
              code: ":codeGenerator_aggregator.text",
            },
          },
          codeGenerator_parse: {
            agent: "jsonParserAgent",
            inputs: {
              data: ":codeGenerator_python.data"
            }
          },
          codeGenerator_chat: {
            agent: "openAIAgent",
            params: {
              model: "gpt-4o",
              max_tokens: 4096,
            },
            isResult: true,
            inputs: {
              prompt: ["[User query: ", ":userPrompt", "]", "[Answer: ", ":codeGenerator_parse", "]"],
              system: "You are given a user query and an answer to that user query computed from a workflow. Summarize the answer in a way that the user will feel that it is a natural response to their question; you are the front-end of this chat system."
            },
          }
        },
      },
      inputs: {
        file: [":csvData"],
        inputs: [],
        userPrompt: ":userPrompt",
      },
    },
  },
};

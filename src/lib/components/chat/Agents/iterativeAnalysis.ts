export const iterativeAnalysis = {
  version: 0.5,
  nodes: {
    userPrompt: {
      value: "",
    },
    chatHistory: {
      value: []
    },
    llmEngine: {
      value: "",
    },
    csvData: {
      agent: "s3FileAgent",
      params: {
        fileName: "retail_highlight_shopping_list_no_periods.csv",
        bucket: "bp-authoring-files",
        region: "us-west-2",
      },
      inputs: {},
    },
    csvDataChunks: {
      agent: "stringSplitterAgent",
      inputs: {
        text: ":csvData.text"
      },
      params: {
        chunkSize: 400
      }
    },
    csvDataHead: {
      agent: "shiftAgent",
      inputs: {
        array: ":csvDataChunks.contents"
      }
    },
    businessRules: {
      agent: "s3FileAgent",
      params: {
        fileName: "model-friendly rules 2024-08-19.txt",
        bucket: "bp-authoring-files",
        region: "us-west-2",
      },
      inputs: {},
    },
    runCodeGen: {
      agent: ":llmEngine",
      inputs: {
        messages: ":chatHistory",
        system: ["You are capable of either returning True or False. You are part of a larger system that has access to a dataset containing product information and sales data for DTC goods. Return True if the question you receive is likely related to specific information in this dataset (e.g product attributes, sales figures). Otherwise, if just asking for some general field, like a definition or some other question, return False. If the user asks for any type of quantity referencing the given definitions, return True unless they are asking for a definition, explanation, etc."]
      },
    },
    checkInput: {
      agent: "compareAgent",
      inputs: { array: [":runCodeGen.text", "!=", "False"] },
    },
    conversationLLM: {
      agent: ":llmEngine",
      inputs: {
        system: "You are a helpful chat assistant with an expertise in DTC consumer fashion.",
        messages: ":chatHistory"
      },
      unless: ":checkInput",
      isResult: true
    },
    questionExtractor: {
      agent: ":llmEngine",
      inputs: {
        messages: ":chatHistory",
        system: "You have been given a chat history. From that, output a string which is a summarized version of the question that the user asking, that is complete enough to be self-sufficient in terms of knowledge. You should summarize anything from the history relevant to answering the question, so that it can be answered without reading the entire prior context."
      },
      params: {
        temperature: 0
      },
      if: ":checkInput",
    },
    codeGenerator: {
      agent: "nestedAgent",
      if: ":checkInput",
      inputs: {
        file: [":csvData"],
        inputs: [],
        question: ":questionExtractor.text",
        llmEngine: ":llmEngine"
      },
      graph: {
        version: 0.5,
        nodes: {
          codeGenerator_inputFiles: {
            agent: "codeGenerationTemplateAgent",
            params: {
              prompt: "Return the results as a pd.DataFrame. Pandas series are not serializable; avoid these." ,
              bucket: "bp-authoring-files",
              region: "us-west-2",
            },
            inputs: {
              file: ":file",
              inputs: ":inputs",
              userPrompt: ":question"
            },
          },
          codeGeneratorSubroutine: {
            agent: "nestedAgent",
            inputs: {
              prompt: ":codeGenerator_inputFiles.prompt",
              codeGenerator_inputFiles: ":codeGenerator_inputFiles",
              llmEngine: ":llmEngine",
            },
            graph: {
              version: 0.5,
              loop: {
                while: ":continue",
              },
              nodes: {
                continue: {
                  value: false,
                  update: ":catchError"
                },
                prompt: {
                  value: "",
                  update: ":addErrorToPrompt",
                },
                writeCode: {
                  agent: ":llmEngine",
                  inputs: {
                    prompt: ":prompt",
                    system: ":codeGenerator_inputFiles.system",
                    temperature: ":codeGenerator_inputFiles.temperature",
                    max_tokens: ":codeGenerator_inputFiles.max_tokens",
                  },
                },
                executeCode: {
                  agent: "pythonCodeAgent",
                  params: {},
                  inputs: {
                    code: ":writeCode.text",
                  },
                  isResult: true
                },
                 catchError: {
                  agent: "compareAgent",
                  if: ":executeCode.onError",
                  inputs: {
                    array: [":executeCode.onError.message", "!=", ""]
                  },
                },
                addErrorToPrompt: {
                  agent: "stringTemplateAgent",
                  if: ":executeCode.onError",
                  params: {
                    template: "You previously generated code that attempted to answer the question: ${query}, but encountered this error: ${errorMessage}. Please try again, avoiding that error."
                  },
                  inputs: {
                    query: ":codeGenerator_inputFiles.prompt",
                    errorMessage: ":executeCode.onError.message"
                  }
                }
              }
            }
          },
          extractResults: {
            agent: "copyAgent",
            inputs: {
              array: ":codeGeneratorSubroutine.executeCode.data"
            },
            isResult: true
          }
        }
      }
    },
    parsedResults: {
      agent: "jsonParserAgent",
      inputs: {
        data: ":codeGenerator.extractResults.array"
      },
    },
    summarizeDataToUser: {
      agent: ":llmEngine",
      isResult: true,
      inputs: {
        messages: ":chatHistory",
        prompt: ["[Answer: ", ":parsedResults", "]"],
        system: "You are given a user chat session and an answer to the latest user query computed from a workflow. Summarize the answer in a way that the user will feel that it is a natural response to their question; you are the front-end of this chat system. Don't make up any details; only summarize direct info that is given to you. If you are given tabular data, a markdown table is preferable.",
      },

      console: {
        before: true
      }
    }
  },
};

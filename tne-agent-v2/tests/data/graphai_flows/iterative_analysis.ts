export const iterativeAnalysis= {
  version: 0.5,
  nodes: {
    userPrompt: {
      value: "What are the top 10 crossbody bags?",
    },
    csvData: {
      agent: "s3FileAgent",
      params: {
        fileName: "retail_highlight_shopping_list_no_periods.csv",
      },
      inputs: {},
    },
    businessRules: {
      agent: "s3FileAgent",
      params: {
        fileName: "model-friendly rules 2024-08-19.txt"
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
      isResult: true
    },
    promptDecomposer: {
      agent: "openAIAgent",
      inputs: {
        prompt: [":userPrompt", ":csvData.text", ":businessRules.text"],
        system: "You have been given a query related to the attached dataset. Decompose this query into a list of pseudocode steps required in order to extract the requested data from the dataset. Only generate this list, and nothing else. Be as specific as possible; your outputs will be used to guide small, limited capability, language models to generate code for each step. Each step should output a dataframe that can be inputted by the next step. Output your list as valid JSON, with a 'step' field corresponding to the pseudocode text only (no nesting). The first step should also be 'Load the dataframe ${fileName} from S3. For extremely simple operations, you may combine multiple operations into a single step."
      },
      if: ":checkInput",
    },
    promptDecomposerJson: {
      agent: "jsonParserAgent",
      inputs: {
        text: ":promptDecomposer.text.codeBlock()"
      },
      if: ":checkInput",
    },
    codeGenerator: {
      agent: "nestedAgent",
      if: ":checkInput",
      graph: {
        version: 0.5,
        loop: {
          while: ":workflowSteps"
        },
        nodes: {
          workflowSteps: {
            value: [],
            update: ":shift.array"
          },
          results: {
            value: [],
            update: ":reducer.array",
            isResult: true
          },
          shift: {
            agent: "shiftAgent",
            inputs: {
              array: ":workflowSteps"
            },
          },
          computedData: {
            agent: "popAgent",
            inputs: {
              array: ":results"
            },
          },
          codeGenerator_inputFiles: {
            agent: "codeGenerationTemplateAgent",
            params: {
              prompt: "Return the results as a pd.DataFrame. Unless your instructions are to load the dataframe from S3, access the dataframe using a variable `PROCESS_INPUT`, which is a dataframe serialized into a list object. Use pd.DataFrame(PROCESS_INPUT) to access the dataframe. You MUST convert all timestamps to string, as they are not JSON-serializable. Pandas series are also not serializable; avoid these." ,
            },
            inputs: {
              file: ":file",
              inputs: ":inputs",
              userPrompt: ":shift.item.step"
            }
          },
          codeGeneratorSubroutine: {
            agent: "nestedAgent",
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
                  update: ":addErrorToPrompt"
                },
                writeCode: {
                  agent: "openAIAgent",
                  params: {
                    model: "gpt-4o",
                    max_tokens: 4096,
                  },
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
                    data: ":computedData.item"
                  },
                  isResult: true
                },
                catchError: {
                  agent: "compareAgent",
                  if: ":executeCode.onError",
                  inputs: {
                    array: [":executeCode.onError.message", "!=", ""]
                  },
                  console: {
                    before: true,
                    after: true
                  }
                },
                addErrorToPrompt: {
                  agent: "stringTemplateAgent",
                  if: ":executeCode.onError",
                  params: {
                    template: "You previously generated code that attempted to answer the question: ${query}, but encountered this error: ${errorMessage}. Please try again, avoiding that error."
                  },
                  inputs: {
                    query: ":prompt",
                    errorMessage: ":executeCode.onError.message"
                  }
                }
              }
            },
            inputs: {
              prompt: ":codeGenerator_inputFiles.prompt",
              codeGenerator_inputFiles: ":codeGenerator_inputFiles",
              computedData: ":computedData"
            }
          },
          reducer: {
            agent: "pushAgent",
            inputs: {
              array: ":results",
              item: ":codeGeneratorSubroutine.executeCode.data"
            },
          }
        }
      },
      inputs: {
        file: [":csvData"],
        inputs: [],
        workflowSteps: ":promptDecomposerJson"
      }
    },
    extractResults: {
      agent: "popAgent",
      inputs: {
        array: ":codeGenerator.results"
      }
    },
    parsedResults: {
      agent: "jsonParserAgent",
      inputs: {
        data: ":extractResults.item"
      },
      console: {
        after: true
      }
    },
    summarizeDataToUser: {
      agent: "openAIAgent",
      params: {
        model: "gpt-4o",
        max_tokens: 4096,
      },
      isResult: true,
      inputs: {
        prompt: ["[User query: ", ":userPrompt", "]", "[Answer: ", ":parsedResults", "]"],
        system: "You are given a user query and an answer to that user query computed from a workflow. Summarize the answer in a way that the user will feel that it is a natural response to their question; you are the front-end of this chat system. Don't make up any details; only summarize direct info that is given to you. If you are given tabular data, a markdown table is preferable."
      }
    }
  },
};

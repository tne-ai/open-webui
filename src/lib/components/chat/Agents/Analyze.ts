export const Analyze = {
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
        fileName: "handbags-shopping_list-no_run-1_1-with_periods_cleaned.csv",
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
    domainRules: {
      agent: "s3FileAgent",
      params: {
        fileName: "tejv-domain-rules.txt",
        bucket: "bp-authoring-files",
        region: "us-west-2",
      },
      inputs: {},
    },
    ruleSyntaxKey: {
      agent: "s3FileAgent",
      params: {
        fileName: "model-friendly-rule-syntax-key.txt",
        bucket: "bp-authoring-files",
        region: "us-west-2"
      }
    },
    chatExplainPrompt: {
      agent: "s3FileAgent",
      params: {
        fileName: "chat_explain_prompt.txt",
        bucket: "bp-authoring-files",
        region: "us-west-2"
      }
    },
    metadata: {
      agent: "s3FileAgent",
      params: {
        fileName: "complete-handbags-shopping_list-no_run-1_1-with_periods-metadata.txt",
        bucket: "bp-authoring-files",
        region: "us-west-2"
      }
    },
    relevancePrompt: {
      agent: "s3FileAgent",
      params: {
        fileName: "ruleset_relevance_prompt.txt",
        bucket: "bp-authoring-files",
        region: "us-west-2"
      }
    },
    rulesetRelevance: {
      agent: ":llmEngine",
      inputs: {
        messages: ":chatHistory",
        system: [":relevancePrompt.text", "\n\n", ":domainRules.text", "\n\n", ":ruleSyntaxKey.text", "\n\n", ":metadata.text"]
      },
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
        llmEngine: ":llmEngine",
        relevantRules: ":rulesetRelevance",
        ruleSyntaxKey: ":ruleSyntaxKey",
        metadata: ":metadata"
      },
      params: {
        temperature: 0
      },
      graph: {
        version: 0.5,
        nodes: {
          codeGenerator_inputFiles: {
            agent: "codeGenerationTemplateAgent",
            params: {
              prompt: "For the given question, you must generate a pd.DataFrame. Do NOT use the matplotlib library. Even when asked to generate a certain type of chart, like a bar or line, you must simply generate a pd.DataFrame that will be amenable to downstream charting.",
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
              relevantRules: ":relevantRules",
              ruleSyntaxKey: ":ruleSyntaxKey",
              metadata: ":metadata"
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
                    system: [":codeGenerator_inputFiles.system", "\n\n", ":relevantRules.text", "\n\n", ":ruleSyntaxKey.text", "\n\n", ":metadata.text"],
                    temperature: ":codeGenerator_inputFiles.temperature",
                    max_tokens: ":codeGenerator_inputFiles.max_tokens",
                  },
                  isResult: true
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
            },
            isResult: true
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
        system: ":chatExplainPrompt.text"
      },

      console: {
        before: true
      }
    }
  },
};

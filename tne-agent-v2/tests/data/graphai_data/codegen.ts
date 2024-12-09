import {openAIAgent} from "@graphai/llm_agents";

export const expectCodeGen = {
  version: 0.5,
  nodes: {
    runCodeGen: {
      agent: "openAIAgent",
      params: { stream: true },
      inputs: {
        prompt: ":userPrompt",
        system: "You are capable of either returning True or False. Return true if the question is about crossbody bags. Otherwise, return false."
      },
    },
    checkInput: {
      agent: "compareAgent",
      inputs: { array: [":runCodeGen.text", "!=", "False"] },
    },
    conversationLLM: {
      agent: "openAIAgent",
      params: { stream: true },
      inputs: {
        prompt: ":userPrompt",
        system: "You are a helpful chat assistant with an expertise in DTC consumer fashion."
      },
      unless: ":checkInput",
      isResult: true,
    },
    dzUmgSK1LWJ6cWwC55pM8: {
      agent: "nestedAgent",
      if: ":checkInput",
      graph: {
        version: 0.5,
        nodes: {
          dzUmgSK1LWJ6cWwC55pM8_codeGeneration: {
            agent: "codeGenerationTemplateAgent",
            params: {
              prompt: "Return the results as a pd.DataFrame.",
            },
            passThrough: {
              nodeType: "codeGenerationTemplate",
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
              max_tokens: 4096,
            },
            passThrough: {
              nodeType: "codeGenerationLlm",
              nodeId: "dzUmgSK1LWJ6cWwC55pM8_llm",
              nodeTitle: "Generate Code",
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
              nodeType: "pythonCode",
              nodeId: "dzUmgSK1LWJ6cWwC55pM8_python",
              nodeTitle: "Generate Code python code",
            },
            isResult: true,
            inputs: {
              code: ":dzUmgSK1LWJ6cWwC55pM8_llm.choices.$0.message.content",
            },
          },
        },
      },
      passThrough: {
        nodeType: "codeGeneration",
        nodeId: "dzUmgSK1LWJ6cWwC55pM8",
        nodeTitle: "Generate Code",
      },
      isResult: true,
      inputs: {
        file: [":Z-yToHlfAqvGS1SGWJ7Ml"],
        inputs: [],
        userPrompt: ":userPrompt",
      },
    },
    "Z-yToHlfAqvGS1SGWJ7Ml": {
      agent: "s3FileAgent",
      params: {
        fileName: "retail_highlight_shopping_list_no_periods.csv",
      },
      passThrough: {
        nodeType: "file",
        nodeId: "Z-yToHlfAqvGS1SGWJ7Ml",
      },
      inputs: {},
    },
    userPrompt: {
      value: "What are the top 10 crossbody bags?",
    }
  },
};

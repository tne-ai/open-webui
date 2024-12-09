export type CodeGenerationNodeData = {
  id: string;
  agent: "codeGenerationAgent";
  params: {
    prompt: string;
    tneModel: string;
    outputType: string;
    useUserQuery: boolean;
  };
  passThrough: {
    nodeType: "codeGeneration";
    nodeId: string;
    nodeTitle: string;
  };
  isResult: boolean;
};
export declare const codeGenerationAgent: (
  node: {
    data: CodeGenerationNodeData;
  },
  modelReactFlowModel: any
) => {
  agent: string;
  graph: {
    version: number;
    nodes: {
      [x: string]:
        | {
            agent: string;
            params: {
              prompt: string;
            };
            passThrough: {
              nodeType: string;
              nodeId: string;
              nodeTitle: string;
            };
            inputs: {
              file: string;
              inputs: string;
              userPrompt: string;
              prompt?: undefined;
              model?: undefined;
              system?: undefined;
              temperature?: undefined;
              max_tokens?: undefined;
              code?: undefined;
            };
          }
        | {
            inputs: {
              prompt: string;
              model: string;
              system: string;
              temperature: string;
              max_tokens: string;
              file?: undefined;
              inputs?: undefined;
              userPrompt?: undefined;
              code?: undefined;
            };
            id: string;
            agent: string;
            params: {
              tneModel: string;
              mapping: string;
              outputType: string;
              toolJson: string;
              toolCode: string;
              useUserQuery: boolean;
            };
            passThrough: {
              nodeType: "llm";
              nodeId: string;
              nodeTitle: string;
            };
            isResult: boolean;
          }
        | {
            inputs: {
              prompt: string;
              model: string;
              system: string;
              temperature: string;
              max_tokens: string;
              file?: undefined;
              inputs?: undefined;
              userPrompt?: undefined;
              code?: undefined;
            };
            agent: any;
            params: any;
            passThrough: any;
            isResult: boolean;
          }
        | {
            params: {
              prompt?: undefined;
            };
            inputs: {
              code: string;
              file?: undefined;
              inputs?: undefined;
              userPrompt?: undefined;
              prompt?: undefined;
              model?: undefined;
              system?: undefined;
              temperature?: undefined;
              max_tokens?: undefined;
            };
            id: string;
            agent: "pythonCodeAgent";
            passThrough: {
              nodeType: "pythonCode";
              nodeId: string;
              nodeTitle: string;
            };
            isResult: boolean;
          };
    };
  };
  passThrough: {
    nodeType: "codeGeneration";
    nodeId: string;
    nodeTitle: string;
  };
  isResult: boolean;
};

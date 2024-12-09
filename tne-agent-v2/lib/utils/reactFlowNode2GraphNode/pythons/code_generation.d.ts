import { ReactFlowNodeCodeGeneration } from "../../../types";
export declare const reactFlowNode2GraphCodeGenerationNode: (node: ReactFlowNodeCodeGeneration) => {
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
            passThrough: {
              nodeType: string;
              nodeId: string;
              nodeTitle: string;
            };
            isResult: boolean;
            agent: string;
            params: Record<string, unknown>;
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
            passThrough: {
              nodeType: string;
              nodeId: string;
              nodeTitle: string;
            };
            isResult: boolean;
            value: string;
            agent?: undefined;
            params?: undefined;
          }
        | {
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
            isResult: boolean;
            agent: string;
            params: Record<string, unknown>;
            passThrough: {
              nodeType: string;
              nodeId: string;
              nodeTitle: string;
            };
          };
    };
  };
  passThrough: {
    nodeType: string;
    nodeId: string;
    nodeTitle: string;
  };
  isResult: boolean;
}[];

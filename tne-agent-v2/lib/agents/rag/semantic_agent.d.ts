import { AgentFunction } from "graphai";
export declare const semanticAgent: AgentFunction<{
    semanticDbName: string;
    semanticServerUrl: string;
    maxEmbeddings?: number;
    similarityThreshold?: number;
}, Record<string, unknown>, null, {
    userInput: string;
    array: string[];
}>;
declare const semanticAgentInfo: {
    name: string;
    samples: {
        inputs: never[];
        params: {};
        result: {};
    }[];
    description: string;
    category: never[];
    author: string;
    repository: string;
    license: string;
    agent: AgentFunction<any, any, any, any>;
    mock: AgentFunction<any, any, any, any>;
};
export default semanticAgentInfo;

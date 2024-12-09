import { AgentFunction } from "graphai";
export declare const ragAgent: AgentFunction<{
    ragDbName: string;
    ragServerUrl: string;
}, {
    rag_output: string;
    anns_summary: string;
}, null, {
    userInput: string;
    array: string[];
}>;
declare const ragAgentInfo: {
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
export default ragAgentInfo;

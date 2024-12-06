import { AgentFunction, DefaultInputData } from "graphai";
export declare const s3FileWriteAgent: AgentFunction<{
    fileName: string;
    bucket?: string;
    region?: string;
}, string, DefaultInputData, {
    text?: string | string[];
}>;
declare const s3FileWriteAgentInfo: {
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
export default s3FileWriteAgentInfo;

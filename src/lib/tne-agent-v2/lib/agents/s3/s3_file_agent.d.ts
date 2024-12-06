import { AgentFunction } from "graphai";
import { S3Data } from "../../utils/s3";
export declare const s3FileAgent: AgentFunction<{
    fileName: string;
    bucket?: string;
    region?: string;
}, S3Data | Record<string, never>>;
declare const s3FileAgentInfo: {
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
export default s3FileAgentInfo;

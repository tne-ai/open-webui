import { S3Data } from "../../utils/s3";
import { AgentFunction } from "graphai";
export declare const s3FileDummyAgentGenerator: (basePath: string) => AgentFunction<{
    fileName: string;
    bucket?: string;
    region?: string;
}, S3Data>;

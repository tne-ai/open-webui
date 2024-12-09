import { AgentFunction, AgentFunctionInfo } from "graphai";
import { S3Data } from "../../types";
export declare const codeGenerationTemplateAgent: AgentFunction<{
    prompt: string;
}, // params
Record<string, any>, Record<string, never>, {
    file: S3Data[];
    inputs?: string[];
    model?: any;
    userPrompt?: string;
}>;
declare const codeGenerationTemplateAgentInfo: AgentFunctionInfo;
export default codeGenerationTemplateAgentInfo;

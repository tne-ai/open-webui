import { AgentFunction, AgentFunctionInfo } from "graphai";
import { S3Data } from "../../types";
export declare const codeGenerationTemplateAgent: AgentFunction<{
    prompt: string;
}, // params
{
    prompt?: string;
    model: string;
    system: string;
    temperature: number;
    max_tokens: number;
}, null, {
    file: S3Data[];
    inputs?: string[];
    model?: any;
    userPrompt?: string;
}>;
declare const codeGenerationTemplateAgentInfo: AgentFunctionInfo;
export default codeGenerationTemplateAgentInfo;

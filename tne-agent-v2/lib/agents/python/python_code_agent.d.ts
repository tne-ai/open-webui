import { AgentFunction, AgentFunctionInfo } from "graphai";
type ParamInput = {
    code?: string;
    data?: unknown;
};
type ResultData = Record<string, never>;
export declare const pythonCodeAgent: AgentFunction<ParamInput, ResultData, ParamInput>;
declare const pythonCodeAgentInfo: AgentFunctionInfo;
export default pythonCodeAgentInfo;

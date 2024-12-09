import { AgentFunction, AgentFunctionInfo } from "graphai";
type ParamInput = {
    code?: string;
    data?: unknown;
};
type OnError = {
    onError: {
        message: string;
        status?: number;
        details?: string | Record<string, unknown>;
    };
};
type ResultData = Record<string, never>;
export declare const pythonCodeAgent: AgentFunction<ParamInput, ResultData | OnError, null, ParamInput>;
declare const pythonCodeAgentInfo: AgentFunctionInfo;
export default pythonCodeAgentInfo;

import { AgentReactFlowNode } from "../types";
export declare const getEnvironmentValue: (key: string) => string;
export declare const cleanObject: (obj: Record<string, unknown>) => Record<string, unknown>;
export declare const promiseAll: <ParamType = unknown, RetType = unknown>(func: (param: ParamType, index: number) => Promise<RetType>, _params: ParamType[], concurrency: number, verbose?: boolean) => Promise<(RetType | Error)[]>;
export declare const isNestedNode: (reactFlowNode: AgentReactFlowNode) => boolean;

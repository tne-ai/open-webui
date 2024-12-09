import { AgentFilterFunction } from "graphai";
export declare const tneDataConverterAgentFilter: AgentFilterFunction;
export declare const getAgentFilters: (outputConsole?: boolean) => ({
    name: string;
    agent: AgentFilterFunction;
    agentIds: string[];
} | {
    name: string;
    agent: AgentFilterFunction;
    agentIds?: undefined;
})[];

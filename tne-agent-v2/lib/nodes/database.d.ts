import { NodeTypeDatabase } from "../types";
export type DatabaseNodeData = {
    id: string;
    agent: "databaseAgent";
    params: {
        dbName: string;
        query: string;
        queryName: string;
    };
    passThrough: {
        nodeType: typeof NodeTypeDatabase;
        nodeId: string;
        nodeTitle: string;
    };
    isResult: boolean;
};
export declare const databaseAgentDefaultValue: DatabaseNodeData;
export declare const initDatabaseAgent: (id: string) => DatabaseNodeData;
export declare const updateDatabaseAgent: (id: string, title: string, dbName: string, query: string, queryName: string) => DatabaseNodeData;

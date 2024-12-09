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

export const databaseAgentDefaultValue: DatabaseNodeData = {
  id: "",
  agent: "databaseAgent",
  params: {
    dbName: "",
    query: "",
    queryName: "",
  },
  passThrough: {
    nodeType: NodeTypeDatabase,
    nodeId: "",
    nodeTitle: "PostgreSQL Database",
  },
  isResult: true,
};

export const initDatabaseAgent = (id: string): DatabaseNodeData => {
  const init = { ...databaseAgentDefaultValue };
  if (init?.passThrough?.nodeId === "") {
    init.passThrough.nodeId = id;
  }
  return {
    ...init,
    id,
  };
};

export const updateDatabaseAgent = (id: string, title: string, dbName: string, query: string, queryName: string): DatabaseNodeData => {
  return {
    id,
    agent: "databaseAgent",
    params: {
      dbName,
      query,
      queryName,
    },
    passThrough: {
      nodeType: NodeTypeDatabase,
      nodeId: id,
      nodeTitle: title,
    },
    isResult: true,
  };
};

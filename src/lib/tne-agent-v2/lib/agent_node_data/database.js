"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDatabaseAgent = exports.initDatabaseAgent = exports.databaseAgentDefaultValue = void 0;
const types_1 = require("../types");
exports.databaseAgentDefaultValue = {
  id: "",
  agent: "databaseAgent",
  params: {
    dbName: "",
    query: "",
    queryName: "",
  },
  passThrough: {
    nodeType: types_1.NodeTypeDatabase,
    nodeId: "",
    nodeTitle: "PostgreSQL Database",
  },
  isResult: true,
};
const initDatabaseAgent = (id) => {
  const init = { ...exports.databaseAgentDefaultValue };
  if (init?.passThrough?.nodeId === "") {
    init.passThrough.nodeId = id;
  }
  return {
    ...init,
    id,
  };
};
exports.initDatabaseAgent = initDatabaseAgent;
const updateDatabaseAgent = (id, title, dbName, query, queryName) => {
  return {
    id,
    agent: "databaseAgent",
    params: {
      dbName,
      query,
      queryName,
    },
    passThrough: {
      nodeType: types_1.NodeTypeDatabase,
      nodeId: id,
      nodeTitle: title,
    },
    isResult: true,
  };
};
exports.updateDatabaseAgent = updateDatabaseAgent;

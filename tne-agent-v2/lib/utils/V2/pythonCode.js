"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pythonCodeAgent = void 0;
// import { cleanObject } from "../utils";
const pythonCodeAgent = (node, code) => {
  const agent = node.data;
  const params = { ...agent.params, code };
  agent.params = params;
  return agent;
};
exports.pythonCodeAgent = pythonCodeAgent;

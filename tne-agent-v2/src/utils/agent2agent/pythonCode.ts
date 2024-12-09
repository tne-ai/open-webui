import { PythonCodeReactFlowNode } from "../../types";

export const pythonCodeAgent = (node: PythonCodeReactFlowNode, code?: string) => {
  const { agent, params, passThrough, isResult } = node.data;
  // delete agent.id;
  return {
    agent,
    params: {
      ...params,
      code,
    },
    passThrough,
    isResult,
  };
};

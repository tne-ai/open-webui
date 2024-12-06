"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.llmAgent = void 0;
const llmAgent = (node, modelReactFlowModel) => {
  /*
    {
      params: { // Todo
        mapping: '',
        outputType: 'overwrite',
        toolJson: '',
        toolCode: '',
        useUserQuery: false
      },
      isResult: true
    } {
      agent: 'openAIAgent',
      params: {
        model: 'gpt-4o',
        max_tokens: 500,
        temperature: 0,
        mergeableSystem: '123',
        stream: true
      },
      passThrough: { nodeType: 'openAI', nodeTitle: 'GraphAI', database: '' }
    }
  */
  const { id, isResult } = node.data;
  const { agent, params, passThrough } = modelReactFlowModel;
  return {
    agent,
    params: {
      ...params,
    },
    passThrough: {
      ...passThrough,
      nodeId: id,
    },
    isResult,
  };
  return node.data;
};
exports.llmAgent = llmAgent;

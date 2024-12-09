"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactFlowNode2GraphQueryStaticNode = void 0;
const reactFlowNode2GraphQueryStaticNode = (node) => {
  const { input } = node.data;
  return {
    value: input,
  };
};
exports.reactFlowNode2GraphQueryStaticNode = reactFlowNode2GraphQueryStaticNode;

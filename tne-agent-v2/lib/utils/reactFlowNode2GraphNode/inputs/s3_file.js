"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactFlowNode2GraphS3FileNode = void 0;
const reactFlowNode2GraphS3FileNode = (node) => {
  const { fileName } = node.data;
  return {
    agent: "s3FileAgent",
    params: {
      fileName,
    },
    passThrough: {
      nodeType: "file",
      nodeId: node.id,
    },
  };
};
exports.reactFlowNode2GraphS3FileNode = reactFlowNode2GraphS3FileNode;

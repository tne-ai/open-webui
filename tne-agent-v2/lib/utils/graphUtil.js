"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noOutputNodes = void 0;
const noOutputNodes = (graph) => {
  const nodeKeys = Object.keys(graph.nodes);
  const remove = (key) => {
    const index = nodeKeys.findIndex((k) => k === key);
    if (index > -1) {
      nodeKeys.splice(index, 1);
    }
  };
  remove("userPrompt");
  Object.keys(graph.nodes).map((key) => {
    const node = graph.nodes[key];
    if ("inputs" in node) {
      Object.values(node.inputs ?? {})
        .flat(10)
        .filter((id) => {
          return id !== ":userPrompt" && !id.startsWith(":parent_");
        })
        .map((id) => id.split(".")[0])
        .map((id) => id.slice(1))
        .forEach((id) => remove(id));
    }
  });
  return nodeKeys;
};
exports.noOutputNodes = noOutputNodes;

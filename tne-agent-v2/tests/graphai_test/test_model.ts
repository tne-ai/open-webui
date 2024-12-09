import * as yaml from "js-yaml";

import { readData } from "../utils/file_utils";
import { llmAgent, codeGenerationAgent, pythonCodeAgent, nestedAgent } from "../../src/utils/agent2agent";
import { NodeTypeLLM, NodeTypePythonCode, NodeTypeCodeGeneration, NodeTypeNested, AgentReactFlowNode } from "../../src/types";
import { reactFlowNode2GraphNode } from "../../src/utils/node2agent";

import test from "node:test";
import assert from "node:assert";

import fs from "fs";
import path from "path";

const searchDirs = (dirPath: string, dirs: string[] = []): string[] => {
  const currentDirs = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const currentDir of currentDirs) {
    if (currentDir.isDirectory()) {
      searchDirs(currentDir.path + currentDir.name + "/", dirs);
    } else if (currentDir.isFile() && ["react_flow.yaml"].includes(currentDir.name)) {
      // dirs.push(path.normalize(currentDir.path + currentDir.name));
      dirs.push(path.normalize(currentDir.path));
    }
  }
  return dirs;
};

test("test conver react flow to graph ai", async () => {
  const dirs = searchDirs(__dirname + "/../data/agents_data/");
  await Promise.all(
    dirs.map(async (dir) => {
      const reactFlowAgent = readData(dir + "/react_flow.yaml");
      if (reactFlowAgent.type === NodeTypeLLM) {
        const modelData = readData(dir + "/model.yaml");
        const result = llmAgent(reactFlowAgent, modelData);
        // console.log(reactFlowAgent, modelData, graphAINodeExpect, graphAINode);
        const expect = readData(dir + "/graphai_agent.yaml");
        assert.deepStrictEqual(result, expect);
      } else if (reactFlowAgent.type === NodeTypePythonCode) {
        const code = readData(dir + "code.py");
        const result = pythonCodeAgent(reactFlowAgent, code);
        const expect = readData(dir + "/graphai_node.yaml") || {};
        assert.deepStrictEqual(result, expect);
      } else if (reactFlowAgent.type === NodeTypeCodeGeneration) {
        const modelData = readData(dir + "/model.yaml");
        const result = codeGenerationAgent(reactFlowAgent, modelData);
        const expect = readData(dir + "/graphai_agent.yaml");
      } else if (reactFlowAgent.type === NodeTypeNested) {
        // TODO
      } else {
        console.log("not hit");
      }
    })
  );
  // assert.deepStrictEqual(result, true);
});

test("test conver text node", async () => {
  const result = await reactFlowNode2GraphNode({ id: "123", type: "text", data: { id: "123", title: "title", value: "this is it" } }, {}, {}, {}, {});
  assert.deepStrictEqual(result, { value: "this is it" });
  // console.log(res);
});

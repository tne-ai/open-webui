import "dotenv/config";
import { GraphAI } from "graphai";
import { generateGraph } from "../graphai_test/common";
import { getAgentFilters } from "../../src/utils/agentFilter";

import * as agents from "@graphai/llm_agents";

import test from "node:test";
import assert from "node:assert";

test("test run chat", async () => {
  const agentFilters = getAgentFilters();

  const graphData = await generateGraph("/../data/studio_data/chat_sample/", "Demo", "let me know world history");

  const graphai = new GraphAI(graphData, agents, { agentFilters });
  console.log(JSON.stringify(graphData, null, 2));
  // const res = await graphai.run();
});

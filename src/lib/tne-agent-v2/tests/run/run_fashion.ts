import "dotenv/config";
import { GraphAI, agentInfoWrapper } from "graphai";
import { generateGraph } from "../graphai_test/common";
import { getAgentFilters } from "../../src/utils/agentFilter";

import * as llm_agents from "@graphai/llm_agents";
import { s3FileDummyAgentGenerator } from "../../src/agents/s3/s3_file_dummy_agent";

import test from "node:test";
import assert from "node:assert";

test("test run llm endpoint demo", async () => {
  const agentFilters = getAgentFilters();
  const s3FileAgent = s3FileDummyAgentGenerator(__dirname + "/../data/expert_data/fashion/");

  const graphData = await generateGraph("/../data/expert_data/fashion/", "Fashion");
  console.log(JSON.stringify(graphData, null, 2));

  const graphai = new GraphAI(graphData, { ...llm_agents, s3FileAgent: agentInfoWrapper(s3FileAgent) }, { agentFilters });
  graphai.onLogCallback = (log: any, isUpdate: boolean) => {
    console.log(log);
  };
  const res = (await graphai.run()) as any;
  console.log(JSON.stringify(res, null, 2));
});

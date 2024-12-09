import "dotenv/config";
import { GraphAI, agentInfoWrapper } from "graphai";
import { generateGraph } from "../graphai_test/common";
import { getAgentFilters } from "../../src/utils/agentFilter";

import * as llm_agents from "@graphai/llm_agents";
import * as openai_agents from "@graphai/openai_agent";

// import { s3FileDummyAgentGenerator } from "../../src/agents/s3/s3_file_dummy_agent";

import test from "node:test";
import assert from "node:assert";

test("test run image describe demo", async () => {
  const agentFilters = getAgentFilters();
  // const s3FileAgent = s3FileDummyAgentGenerator(__dirname + "/../data/expert_data/csv_demo/");

  const graphData = await generateGraph("/../data/expert_data/describe_chain/", "DescribeChain");
  // console.log(JSON.stringify(graphData, null, 2));
  const graphai = new GraphAI(graphData, { ...llm_agents, ...openai_agents }, { agentFilters });

  const res = (await graphai.run(true)) as any;
  console.log(JSON.stringify(res, null, 2));
});

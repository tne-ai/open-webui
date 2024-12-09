import "dotenv/config";
import { GraphAI, agentInfoWrapper, AgentFunctionInfoDictionary } from "graphai";
import { getAgentFilters } from "../../src/utils/agentFilter";

import * as llm_agents from "@graphai/llm_agents";
import * as vanilla_agents from "@graphai/vanilla";
import * as service_agents from "@graphai/service_agents";
import { graphData } from "../data/graphai_data/weather";

import test from "node:test";
import assert from "node:assert";

test("test run weather demo", async () => {
  const agentFilters = getAgentFilters();
  const graphai = new GraphAI(graphData, {...llm_agents, ...vanilla_agents, ...service_agents}, { agentFilters } );
  // console.log(JSON.stringify(graphData, null, 2));
  const res = await graphai.run();
  // console.log(JSON.stringify(res, null, 2));
});
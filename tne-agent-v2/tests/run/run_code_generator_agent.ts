import "dotenv/config";
import { GraphAI, agentInfoWrapper } from "graphai";
import { getAgentFilters } from "../../src/utils/agentFilter";

import * as llm_agents from "@graphai/llm_agents";
import * as vanilla_agents from "@graphai/vanilla";
import { s3FileDummyAgentGenerator } from "../../src/agents/s3/s3_file_dummy_agent";
import { codeGenerationTemplateAgent, pythonCodeAgent } from "../../src/agents";

import test from "node:test";
import { expectCodeGen } from "../data/graphai_data";

test("test run code gen", async () => {
  const agentFilters = getAgentFilters();
  const s3FileAgent = s3FileDummyAgentGenerator(__dirname + "/../data/expert_data/codegen/");

  const graphai = new GraphAI(
    expectCodeGen,
    {
      ...llm_agents,
      ...vanilla_agents,
      s3FileAgent: agentInfoWrapper(s3FileAgent),
      codeGenerationTemplateAgent,
      pythonCodeAgent,
    },
    { agentFilters, config: { uid: "114520153332760575553" } }
  );
  const res = await graphai.run();
  console.log(JSON.stringify(res, null, 2));
});

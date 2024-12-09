import "dotenv/config";
import { GraphAI, agentInfoWrapper } from "graphai";
import { generateGraph } from "../graphai_test/common";
import { getAgentFilters } from "../../src/utils/agentFilter";

import * as agents from "../../src/agents";

import test from "node:test";
import assert from "node:assert";

test("test run semantic", async () => {
  const agentFilters = getAgentFilters();
  const graphData = await generateGraph("/../data/expert_data/semantic/", "SemanticTest");

  const config = {
    ragServerUrl: "http://localhost:8080/v2/rag",
    semanticServerUrl: "http://localhost:8080/v2/anns",
  };
  console.log(graphData);
  const graphai = new GraphAI(graphData, { ...agents }, { agentFilters, config });
  graphai.onLogCallback = (log: any, isUpdate: boolean) => {
    console.log(log);
  };

  const res = (await graphai.run(true)) as any;
  console.log(JSON.stringify(res, null, 2));
});

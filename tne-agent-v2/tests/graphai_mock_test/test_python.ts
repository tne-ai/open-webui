import { GraphAI, AgentFunctionContext, AgentFunction, agentInfoWrapper } from "graphai";

import { expectPythonCodeData } from "../data/graphai_data";
import { streamMockGenerator } from "../../src/agents/mock";
import { getAgentFilters } from "../../src/utils/agentFilter";

import test from "node:test";
import assert from "node:assert";

test("test flow", async () => {
  const agentFilters = getAgentFilters();
  // dummy
  const pythonCodeAgent: AgentFunction = streamMockGenerator([
    {
      nodeId: "ML4MsNXENIh751lQRliov",
      response: "this is test1",
    },
    {
      nodeId: "7zjI_el3t2Si2Kz_oZcBh",
      response: "this is test2",
    },
  ]);

  const openAIAgent: AgentFunction = streamMockGenerator([
    {
      nodeId: "VUoU0QHw0SkHYX0cEbQAn",
      response: "this is test3",
    },
  ]);

  const graph = new GraphAI(
    expectPythonCodeData,
    {
      pythonCodeAgent: agentInfoWrapper(pythonCodeAgent),
      openAIAgent: agentInfoWrapper(openAIAgent),
    },
    { agentFilters }
  );

  const results = await graph.run(true);
  console.log(results);
});

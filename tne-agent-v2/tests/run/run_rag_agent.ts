import { ragAgent } from "../../src/agents/rag/rag_agent";

// EMBEDDINGS_DB_PASSWORD=xxxx \
// OPENAI_API_KEY=sk-xxxx \
// node --test --require ts-node/register ./tests/run/run_rag_agent.ts

import test from "node:test";
import assert from "node:assert";

test("test s3agent", async () => {
  const params = {
    ragDbName: "crag_agent_db",
    ragServerUrl: "http://localhost:8080/v2/rag",
  };
  const namedInputs = { userInput: "What is the maximum gallons per flush allowed for a toilet in Seattle?" };
  const config = {};

  const res = await ragAgent({
    params,
    inputs: [],
    config,
    namedInputs,
    debugInfo: {
      verbose: false,
      nodeId: "123",
      retry: 3,
      agentId: "123",
      version: 0.5,
    },
    filterParams: [],
  });
  console.log(res);
});

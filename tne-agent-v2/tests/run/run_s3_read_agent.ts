import { s3FileAgent } from "../../src/agents/s3/s3_file_agent";

import test from "node:test";
import assert from "node:assert";

test("test s3agent", async () => {
  const params = {
    fileName: "data/test1.md",
    bucket: "bp-authoring-files",
    region: "us-west-2",
  };
  const inputs = [{}];
  const config = {
    uid: "109667534372643344433",
  };

  const res = await s3FileAgent({
    params,
    inputs,
    config,
    namedInputs: {},
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

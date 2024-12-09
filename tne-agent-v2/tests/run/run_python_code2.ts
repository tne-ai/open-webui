import test from "node:test";
import { fetchS3File } from "../../src/utils/s3";
import assert from "node:assert";

import { pythonCodeAgent } from "../../src/agents/python/python_code_agent";

const code = `
return PROCESS_INPUT + 2
`;

test("test run code gen", async () => {
  const namedInputs = {
    code,
    session_id: "1234567",
    uid: "107940245150757260273",
    data: 2,
  };
  const res = await pythonCodeAgent({
    namedInputs,
    params: {},
    filterParams: {},
    inputs: [],
    debugInfo: {} as any,
  });
  console.log(res);
});

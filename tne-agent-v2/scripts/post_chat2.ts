import fetch from "node-fetch";
import { Readable } from "stream";
import * as expect from "../tests/expect_graphai_data";

const main = async () => {
  const url = "http://localhost:8085/graph/run2";

  const postBody = { graphData: expect.expectDemoData };
  // const postBody = {graphData: expect.expectDescribeChain };
  // const postBody = {graphData: expect.expectLlmEndpoint };

  const res = await fetch(url, {
    headers: {},
    method: "POST",
    body: JSON.stringify(postBody),
  });
  const body = await res.json();
  console.log(body);
};

main();

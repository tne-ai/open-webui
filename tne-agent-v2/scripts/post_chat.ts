import fetch from "node-fetch";
import { Readable } from "stream";
import * as expect from "../tests/expect_graphai_data";

async function* stream() {
  const url = "http://localhost:8085/graph/run";

  // const postBody = {graphData: expect.expectDemoData};
  // const postBody = {graphData: expect.expectDescribeChain };
  const postBody = { graphData: expect.expectLlmEndpoint };

  const completion = await fetch(url, {
    headers: {
      "Content-Type": "text/event-stream",
    },
    method: "POST",
    body: JSON.stringify(postBody),
  });

  const reader = Readable.from(completion.body);

  for await (const chunk of reader) {
    yield chunk;
  }
}
const main = async () => {
  const generator = stream();
  for await (const token of generator) {
    console.log(Buffer.from(token).toString());
  }
};

main();

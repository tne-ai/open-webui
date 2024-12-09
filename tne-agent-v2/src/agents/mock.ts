import { AgentFunction, sleep } from "graphai";

export type dummyResponses = {
  nodeId: string;
  response: string;
};

export const streamMockGenerator = (dummies: dummyResponses[]) => {
  const mockAgent: AgentFunction = async ({ filterParams, debugInfo }) => {
    const { nodeId } = debugInfo;
    const dummy = dummies.find((d) => d.nodeId === nodeId);
    const dummyResponse = dummy ? dummy.response : "this is sample response";

    for (const token of dummyResponse.split("")) {
      const { streamTokenCallback } = filterParams as { streamTokenCallback?: (data: { message: { role: string; content: string } }) => void };
      if (streamTokenCallback && token) {
        await sleep(20);

        const response = {
          message: {
            role: "assistant",
            content: token,
          },
        };
        streamTokenCallback(response);
      }
    }

    return dummyResponse;
  };
  return mockAgent;
};

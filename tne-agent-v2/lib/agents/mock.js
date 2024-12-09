"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.streamMockGenerator = void 0;
const graphai_1 = require("graphai");
const streamMockGenerator = (dummies) => {
    const mockAgent = async ({ filterParams, debugInfo }) => {
        const { nodeId } = debugInfo;
        const dummy = dummies.find((d) => d.nodeId === nodeId);
        const dummyResponse = dummy ? dummy.response : "this is sample response";
        for (const token of dummyResponse.split("")) {
            const { streamTokenCallback } = filterParams;
            if (streamTokenCallback && token) {
                await (0, graphai_1.sleep)(20);
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
exports.streamMockGenerator = streamMockGenerator;

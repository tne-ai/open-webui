"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3FileWriteAgent = void 0;
const graphai_1 = require("graphai");
const s3_1 = require("../../utils/s3");
const s3FileWriteAgent = async ({ params, config, debugInfo, namedInputs }) => {
    const { fileName, bucket, region } = params;
    const { text } = namedInputs;
    const { uid } = config;
    const { verbose } = debugInfo;
    const Body = Array.isArray(text) ? text.join("\n") : text;
    await (0, s3_1.writeS3File)(uid, fileName, Body, region, bucket, verbose);
    return "";
};
exports.s3FileWriteAgent = s3FileWriteAgent;
const s3FileWriteAgentInfo = (0, graphai_1.agentInfoWrapper)(exports.s3FileWriteAgent);
exports.default = s3FileWriteAgentInfo;

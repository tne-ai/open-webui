"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3FileAgent = void 0;
const graphai_1 = require("graphai");
const s3_1 = require("../../utils/s3");
const s3FileAgent = async ({ params, config, debugInfo, }) => {
    const { fileName, bucket, region } = params;
    const { uid } = config;
    const { verbose } = debugInfo;
    try {
        const bytes = await (0, s3_1.fetchS3File)(uid, "Data/" + fileName, region, bucket, verbose);
        if (bytes) {
            const data = Buffer.from(bytes);
            return (0, s3_1.buffer2returnData)(data, fileName);
        }
    }
    catch (e) {
        console.log(e);
    }
    throw new Error("s3_file_agent failed");
    // const text = await response.Body?.transformToByteArray
    // const arr = await s3Object.Body?.transformToByteArray(); or binary
    // return text;
};
exports.s3FileAgent = s3FileAgent;
const s3FileAgentInfo = (0, graphai_1.agentInfoWrapper)(exports.s3FileAgent);
exports.default = s3FileAgentInfo;

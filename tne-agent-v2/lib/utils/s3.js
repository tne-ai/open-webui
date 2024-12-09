"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileName2fileType = exports.fileName2imageType = exports.buffer2returnData = exports.writeS3File = exports.fetchS3File = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const utils_1 = require("./utils");
const fetchS3File = async (uid, fileName, region, bucket, verbose) => {
    const targetRegion = region ?? (0, utils_1.getEnvironmentValue)("S3_AGENT_REGION") ?? "us-west-2";
    const client = new client_s3_1.S3Client({ region: targetRegion });
    const targetBucket = bucket ?? (0, utils_1.getEnvironmentValue)("S3_AGENT_BUCKET");
    const key = `d/${uid}/${fileName}`;
    if (verbose) {
        console.info(`load: ${key}`);
    }
    const input = {
        Bucket: targetBucket,
        Key: key,
    };
    const command = new client_s3_1.GetObjectCommand(input);
    const response = await client.send(command);
    return await response.Body?.transformToByteArray();
};
exports.fetchS3File = fetchS3File;
const writeS3File = async (uid, fileName, Body, region, bucket, verbose) => {
    const targetRegion = region ?? (0, utils_1.getEnvironmentValue)("S3_AGENT_REGION") ?? "us-west-2";
    const client = new client_s3_1.S3Client({ region: targetRegion });
    const targetBucket = bucket ?? (0, utils_1.getEnvironmentValue)("S3_AGENT_BUCKET");
    const key = `d/${uid}/${fileName}`;
    if (verbose) {
        console.info(`load: ${key}`);
    }
    const input = {
        Bucket: targetBucket,
        Key: key,
        Body,
    };
    // console.log(input)
    const command = new client_s3_1.PutObjectCommand(input);
    return await client.send(command);
};
exports.writeS3File = writeS3File;
const buffer2returnData = (data, fileName) => {
    const fileType = (0, exports.fileName2fileType)(fileName);
    /*
    if (Buffer.compare(data.slice(0, 2), Buffer.from([0xff, 0xd8])) === 0) {
      return {
        fileName,
        dataType: "image",
        imageData: `data:image/jpeg;base64,${data.toString("base64")}`,
      };
    }
    if (Buffer.compare(data.slice(0, 8), Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) === 0) {
      return {
        fileName,
        dataType: "image",
        imageData: `data:image/png;base64,${data.toString("base64")}`,
      };
    }
  */
    if (fileType === "image") {
        const imageType = (0, exports.fileName2imageType)(fileName);
        return {
            fileName,
            dataType: "image",
            imageData: `data:image/${imageType};base64,${data.toString("base64")}`,
        };
    }
    return {
        fileName,
        dataType: fileType,
        text: data.toString("utf-8"),
    };
};
exports.buffer2returnData = buffer2returnData;
const fileName2imageType = (fileName) => {
    const ext = fileName.split(".").slice(-1)[0];
    if (["jpg", "jpeg"].includes(ext)) {
        return "jpeg";
    }
    if (["png"].includes(ext)) {
        return "png";
    }
    if (["gif"].includes(ext)) {
        return "gif";
    }
    return "unknown";
};
exports.fileName2imageType = fileName2imageType;
const fileName2fileType = (fileName) => {
    const ext = fileName.split(".").slice(-1)[0];
    if (["txt", "md", "out"].includes(ext)) {
        return "text";
    }
    else if (["csv"].includes(ext)) {
        return "csv";
    }
    else if (["jpg", "jpeg", "png", "gif"].includes(ext)) {
        return "image";
    }
    else if (["json"].includes(ext)) {
        return "json";
    }
    else if (["yaml", "yml"].includes(ext)) {
        return "yaml";
    }
    return "none";
};
exports.fileName2fileType = fileName2fileType;

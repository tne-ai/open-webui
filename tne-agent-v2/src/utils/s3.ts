import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";

import { getEnvironmentValue } from "./utils";
import type { S3Data } from "../types";
export { S3Data };

export const fetchS3File = async (uid: string, fileName: string, region?: string, bucket?: string, verbose?: boolean) => {
  const targetRegion = region ?? getEnvironmentValue("S3_AGENT_REGION") ?? "us-west-2";
  const client = new S3Client({ region: targetRegion });

  const targetBucket = bucket ?? getEnvironmentValue("S3_AGENT_BUCKET");
  const key = `d/${uid}/${fileName}`;

  if (verbose) {
    console.info(`load: ${key}`);
  }

  const input = {
    Bucket: targetBucket,
    Key: key,
  };
  const command = new GetObjectCommand(input);

  const response = await client.send(command);
  return await response.Body?.transformToByteArray();
};

export const writeS3File = async (uid: string, fileName: string, Body: string | undefined, region?: string, bucket?: string, verbose?: boolean) => {
  const targetRegion = region ?? getEnvironmentValue("S3_AGENT_REGION") ?? "us-west-2";
  const client = new S3Client({ region: targetRegion });

  const targetBucket = bucket ?? getEnvironmentValue("S3_AGENT_BUCKET");
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
  const command = new PutObjectCommand(input);

  return await client.send(command);
};

export const buffer2returnData = (data: Buffer, fileName: string): S3Data => {
  const fileType = fileName2fileType(fileName);
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
    const imageType = fileName2imageType(fileName);
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
export const fileName2imageType = (fileName: string) => {
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
export const fileName2fileType = (fileName: string) => {
  const ext = fileName.split(".").slice(-1)[0];
  if (["txt", "md", "out"].includes(ext)) {
    return "text";
  } else if (["csv"].includes(ext)) {
    return "csv";
  } else if (["jpg", "jpeg", "png", "gif"].includes(ext)) {
    return "image";
  } else if (["json"].includes(ext)) {
    return "json";
  } else if (["yaml", "yml"].includes(ext)) {
    return "yaml";
  }
  return "none";
};

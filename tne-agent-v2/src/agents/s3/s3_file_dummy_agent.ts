import fs from "fs";
import { buffer2returnData, S3Data } from "../../utils/s3";

import { AgentFunction, sleep } from "graphai";

export const s3FileDummyAgentGenerator = (basePath: string) => {
  const s3FileAgent: AgentFunction<{ fileName: string; bucket?: string; region?: string }, S3Data> = async ({ params }) => {
    const { fileName } = params;

    const key = `${basePath}${fileName}`;
    const data = fs.readFileSync(key);
    await sleep(1);
    return buffer2returnData(data, fileName);
  };
  return s3FileAgent;
};

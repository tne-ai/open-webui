import { AgentFunction, agentInfoWrapper } from "graphai";
import { buffer2returnData, S3Data, fetchS3File } from "../../utils/s3";

export const s3FileAgent: AgentFunction<{ fileName: string; bucket?: string; region?: string }, S3Data | Record<string, never>> = async ({
  params,
  config,
  debugInfo,
}) => {
  const { fileName, bucket, region } = params;
  const { uid } = config as Record<string, string>;
  const { verbose } = debugInfo;

  try {
    const bytes = await fetchS3File(uid, "Data/" + fileName, region, bucket, verbose);

    if (bytes) {
      const data = Buffer.from(bytes);
      return buffer2returnData(data, fileName);
    }
  } catch (e) {
    console.log(e);
  }
  throw new Error("s3_file_agent failed");
  // const text = await response.Body?.transformToByteArray
  // const arr = await s3Object.Body?.transformToByteArray(); or binary
  // return text;
};

const s3FileAgentInfo = agentInfoWrapper(s3FileAgent);

export default s3FileAgentInfo;

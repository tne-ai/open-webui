import { AgentFunction, agentInfoWrapper, DefaultInputData } from "graphai";
import { writeS3File } from "../../utils/s3";

export const s3FileWriteAgent: AgentFunction<
  { fileName: string; bucket?: string; region?: string },
  string,
  DefaultInputData,
  { text?: string | string[] }
> = async ({ params, config, debugInfo, namedInputs }) => {
  const { fileName, bucket, region } = params;
  const { text } = namedInputs;
  const { uid } = config as Record<string, string>;
  const { verbose } = debugInfo;

  const Body = Array.isArray(text) ? text.join("\n") : text;

  await writeS3File(uid, fileName, Body, region, bucket, verbose);

  return "";
};

const s3FileWriteAgentInfo = agentInfoWrapper(s3FileWriteAgent);

export default s3FileWriteAgentInfo;

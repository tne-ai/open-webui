import YAML from "yaml";

import { ComputedNodeData } from "graphai";

import { ExpertDataModel } from "../expertDataModel";
import { fetchS3File } from "../utils/s3";
import { NodeTypePythonCode, NodeTypeCodeGeneration, NodeTypeLLM, ReactFlowData } from "../types";

// just for runner
export const loadReactFlowDataFromS3 = async (uid: string, fileName: string) => {
  const expertData = await readYamlFromS3<ReactFlowData>(uid, fileName);
  return expertData;
};

export const generateGraphFromS3 = async (expertData: ReactFlowData, uid: string, userPrompt?: string) => {
  const loadModelFiles = async (fileName: string): Promise<ComputedNodeData> => {
    const bytes = await fetchS3File(uid, "Agents/" + fileName);
    if (bytes) {
      const data = Buffer.from(bytes).toString("utf-8");
      return YAML.parse(data) as ComputedNodeData;
    }
    throw new Error("loadModel failed");
  };

  const loadModuleFiles = async (fileName: string) => {
    const bytes = await fetchS3File(uid, "Code/" + fileName);
    if (bytes) {
      const data = Buffer.from(bytes).toString("utf-8");
      return data;
    }
    throw new Error("loadModel failed");
  };

  const loadProcFiles = async (fileName: string): Promise<ReactFlowData> => {
    const bytes = await fetchS3File(uid, "Experts/" + fileName);
    if (bytes) {
      const data = Buffer.from(bytes).toString("utf-8");
      return YAML.parse(data) as ReactFlowData;
    }
    throw new Error("loadModel failed");
  };

  const expertModel = new ExpertDataModel(loadModelFiles, loadModuleFiles, loadProcFiles); // step 1
  // TODO
  if (userPrompt) {
    expertModel.setUserPrompt(userPrompt);
  }
  await expertModel.setExpert(expertData);
  const graphData = expertModel.convertGraphAi(); // step 3;
  return graphData;
};

const readYamlFromS3 = async <T>(uid: string, fileName: string) => {
  const s3Expert = await fetchS3File(uid, fileName);
  if (!s3Expert) {
    throw new Error("No file exists " + fileName);
  }
  const expertData = YAML.parse(Buffer.from(s3Expert).toString("utf-8")) as T;
  return expertData;
};

export type GraphResult = {
  type: string;
  data: unknown;
  nodeTitle: string;
  nodeType: string;
  choices?: { message: { content: string } }[];
  __timestamp: number;
};

const formatDataPythonCode = (data: GraphResult): string => {
  if (data?.type === "dataFrame") {
    return JSON.stringify(data?.data, null, 2);
  }
  if (data?.type === "data") {
    if (typeof data?.data === "string") {
      return data?.data;
    }
    if (typeof data?.data === "number") {
      return String(data?.data);
    }
    return JSON.stringify(data?.data, null, 2);
  }
  return JSON.stringify(data, null, 2);
};

export const formatData = (data: GraphResult): string => {
  if (data.nodeType === NodeTypePythonCode) {
    return formatDataPythonCode(data);
  }
  if (data.nodeType === NodeTypeCodeGeneration) {
    return (Object.values(data) as GraphResult[])
      .map((d: GraphResult) => {
        return formatData(d);
      })
      .filter((a) => a)
      .join("\n\n");
  }

  if ([NodeTypeLLM, "openAI", "anthropic", "groq", "replicate"].includes(data.nodeType)) {
    return data.choices ? data.choices[0].message.content : "";
  }
  return data as unknown as string;
};

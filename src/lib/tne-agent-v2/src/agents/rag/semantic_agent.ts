import { AgentFunction, agentInfoWrapper } from "graphai";
import { httpRequest } from "../client";

import { getSemanticRequest } from "./rag_utils";

export const semanticAgent: AgentFunction<
  {
    semanticDbName: string;
    semanticServerUrl: string;
    maxEmbeddings?: number;
    similarityThreshold?: number;
  },
  Record<string, unknown>,
  null,
  { userInput: string; array: string[] }
> = async ({ params, namedInputs, config }) => {
  const { userInput, array } = namedInputs;
  const { semanticDbName, maxEmbeddings, similarityThreshold } = params;
  // maxEmbeddings: 10, similarityThreshold: 0.8

  const semanticServerUrl = params.semanticServerUrl ?? config?.semanticServerUrl;
  const queryText = userInput ?? array.join("\n");

  const semanticRequest = getSemanticRequest(semanticDbName, queryText, { maxEmbeddings, similarityThreshold });

  const res = await httpRequest<Record<string, unknown>>(semanticServerUrl, semanticRequest);

  return res;
};

const semanticAgentInfo = agentInfoWrapper(semanticAgent);

export default semanticAgentInfo;

import { AgentFunction, agentInfoWrapper } from "graphai";
import { getRagRequest } from "./rag_utils";
import { streamingRequest } from "../client";

// environmental variables
// OPENAI_API_KEY
// EMBEDDINGS_DB_PASSWORD (user name: postgres)

type RagData = {
  rag_output?: string;
  anns_summary?: string;
};

export const ragAgent: AgentFunction<
  { ragDbName: string; ragServerUrl: string },
  {
    rag_output: string;
    anns_summary: string;
  },
  null,
  { userInput: string; array: string[] }
> = async ({ params, namedInputs, filterParams, config }) => {
  const { userInput, array } = namedInputs;
  const { ragDbName } = params;
  const ragServerUrl = params.ragServerUrl ?? config?.ragServerUrl;
  const queryText = userInput ?? array.join("\n");

  const ragRequest = getRagRequest(ragDbName, queryText);

  const generator = streamingRequest<{
    patch_record: {
      anns_summary?: {
        text: string;
      };
      rag_output?: {
        text: string;
      };
    };
  }>(ragServerUrl, ragRequest);

  const ret = {
    rag_output: "",
    anns_summary: "",
  };
  for await (const token of generator) {
    if (token["patch_record"]["anns_summary"] || token["patch_record"]["rag_output"]) {
      const diff: RagData = {};
      if (token["patch_record"]["rag_output"]) {
        diff["rag_output"] = token["patch_record"]["rag_output"]["text"];
        ret["rag_output"] = ret["rag_output"] + diff["rag_output"];
      }
      if (token["patch_record"]["anns_summary"]) {
        diff["anns_summary"] = token["patch_record"]["anns_summary"]["text"];
        ret["anns_summary"] = ret["anns_summary"] + diff["anns_summary"];
      }
      if (filterParams && filterParams.streamTokenCallback && token) {
        filterParams.streamTokenCallback(diff);
      }
    } else {
      console.log(token);
      // console.log(token["patch_record"]);
    }
  }

  return ret;
};

const ragAgentInfo = agentInfoWrapper(ragAgent);

export default ragAgentInfo;

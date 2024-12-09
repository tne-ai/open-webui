import { AgentFunctionContext, AgentFilterFunction } from "graphai";
import { streamAgentFilterGenerator } from "@graphai/agent_filters";
import { S3Data } from "../types";

export const tneDataConverterAgentFilter: AgentFilterFunction = async (context, next) => {
  if (context.namedInputs.file && Array.isArray(context.namedInputs.file)) {
    context.namedInputs.file.forEach((file: S3Data) => {
      if (file.dataType === "text") {
        if (!context.namedInputs["mergeableSystem"]) {
          context.namedInputs["mergeableSystem"] = [];
        }
        if (Array.isArray(context.namedInputs["mergeableSystem"])) {
          // for type error
          context.namedInputs["mergeableSystem"].push(`FILENAME: ${file.fileName}\n\n`);
          context.namedInputs["mergeableSystem"].push(file.text);
        }
      }
      if (file.dataType === "image") {
        if (!context.namedInputs["images"]) {
          context.namedInputs["images"] = [];
        }
        if (Array.isArray(context.namedInputs["images"])) {
          // for type error
          context.namedInputs["images"].push(file.imageData);
        }
      }
    });
    delete context.namedInputs.file;
  }
  // console.log(context);
  return next(context);
};

const tneTimeStampAgentFilter: AgentFilterFunction = async (context, next) => {
  const result = await next(context);
  if (result instanceof Object && !(result instanceof Array)) {
    result["__timestamp"] = new Date().getTime();
  }
  return result;
};

export const getAgentFilters = (outputConsole: boolean = true) => {
  const callback = (__context: AgentFunctionContext, data: string) => {
    if (outputConsole) {
      console.log(data);
    }
  };
  const streamAgentFilter = streamAgentFilterGenerator(callback);

  const agentFilters = [
    {
      name: "streamAgentFilter",
      agent: tneDataConverterAgentFilter,
      agentIds: ["openAIAgent", "openAIImageAgent", "groqAgent", "anthropicAgent", "geminiAgent"],
    },
    {
      name: "streamAgentFilter",
      agent: streamAgentFilter,
    },
    {
      name: "tneTimeStampAgentFilter",
      agent: tneTimeStampAgentFilter,
    },
  ];
  return agentFilters;
};

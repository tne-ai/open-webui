import "dotenv/config";

import { GraphAI } from "graphai";
import { generateGraphFromS3, loadReactFlowDataFromS3, formatData, GraphResult } from "./utils";
import { getAgentFilters } from "../utils/agentFilter";
import { ReactFlowData } from "../types";

import * as llm_agents from "@graphai/llm_agents";
import * as vanilla_agents from "@graphai/vanilla";
import * as agents from "../agents";
// import { readYamlFile } from "../utils/file_utils";

import { promiseAll } from "../utils/utils";

const runner = async (uid: string, expertData: ReactFlowData, question: string): Promise<string> => {
  const graphData = await generateGraphFromS3(expertData, uid, question);
  const config = {
    uid,
  };

  // console.log(JSON.stringify(graphData, null, 2));return;
  const agentFilters = getAgentFilters(false);
  const graphai = new GraphAI(graphData, { ...agents, ...llm_agents, ...vanilla_agents }, { agentFilters, config });
  // graphai.onLogCallback = (log: any, isUpdate: boolean) => {
  //   console.log(log);
  // };

  const result = (await graphai.run<GraphResult>()) as Record<string, GraphResult>;
  // console.log(JSON.stringify(result, null, 2));

  const resultText = Object.values(result)
    .sort((a: GraphResult, b: GraphResult) => {
      return a["__timestamp"] > b["__timestamp"] ? 1 : -1;
    })
    .reduce((tmp: string[], res: GraphResult) => {
      tmp.push("** " + res.nodeTitle + " **");
      tmp.push(formatData(res));
      return tmp;
    }, [])
    .join("\n");
  return resultText;
};

export const runExpertTest = async (
  uid: string,
  expert: string,
  questions: string[],
  concurrency: number,
  writeLog: (index: number | null, result: string) => void
) => {
  const expertData = await loadReactFlowDataFromS3(uid, "Experts/" + expert);

  const formatText = (index: number, result: string | Error) => {
    const question = questions[index];
    if (result instanceof Error) {
      return `** Question **\n\n${question}\n\n${result.message}`;
    }
    return `** Question **\n\n${question}\n\n${result}`;
  };

  const runQuestion = async (question: string, index: number) => {
    const res = await runner(uid, expertData, question);
    writeLog(index, formatText(index, res));
    return res;
  };

  const ret = await promiseAll<string, string>(runQuestion, questions, concurrency, true);

  const resultLog = Array.from(ret.entries())
    .map(([index, result]) => formatText(index, result))
    .join("\n\n");
  writeLog(null, resultLog);
};

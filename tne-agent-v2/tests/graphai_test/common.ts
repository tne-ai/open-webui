import YAML from "yaml";

import { ExpertDataModel } from "../../src/expertDataModel";
import { fetchS3File } from "../../src/utils/s3";
import { readYamlFile, readTextFile } from "../utils/file_utils";
import { ReactFlowData } from "../../src/types";

/*
  1 read expert
  2 read model if need
  3 convert to graph ai node woth model data
  4 convert edge to inputs and output
*/

// read expert and module files from local;
export const generateGraph = async (baseDir: string, expertFileName: string, userPrompt?: string) => {
  const expertData = readYamlFile(__dirname + baseDir + expertFileName);
  const loadYamlFiles = async (fileName: string) => {
    return readYamlFile(__dirname + baseDir + fileName);
  };
  const loadModuleFiles = async (fileName: string) => {
    return readTextFile(__dirname + baseDir + fileName);
  };

  const expertModel = new ExpertDataModel(loadYamlFiles, loadModuleFiles, loadYamlFiles);
  if (userPrompt) {
    expertModel.setUserPrompt(userPrompt);
  }
  await expertModel.setExpert(expertData); // step 2
  const graphData = await expertModel.convertGraphAi(); // step 3;
  return graphData;
};

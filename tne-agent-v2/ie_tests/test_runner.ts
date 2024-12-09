import { runExpertTest } from "../src/runner/runner";

import fs from "fs";
import path from "path";
import YAML from "yaml";

const fileName = __dirname + "/test_data.yaml";
const seedData = YAML.parse(fs.readFileSync(fileName, "utf8"));
console.log(seedData);

const main = async () => {
  const logDir = __dirname + "/log/";

  const writeLog = (index: number | null, result: string) => {
    const fileName = index === null ? "log.all.md" : `log-${String(index)}.log.md`;
    fs.writeFileSync(path.resolve(logDir + fileName), result);
  };

  await runExpertTest(seedData.uid, seedData.expert, seedData.questions, 5, writeLog);
};

main();

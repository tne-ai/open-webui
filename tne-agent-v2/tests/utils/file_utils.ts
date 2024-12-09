import fs from "fs";
import YAML from "yaml";

export const readData = (file: string) => {
  if (file.endsWith(".yaml") || file.endsWith(".yml")) {
    return readYamlFile(file);
  }
  if (file.endsWith(".json")) {
    return readJsonFile(file);
  }
  if (file.endsWith(".py")) {
    return readTextFile(file);
  }
  throw new Error("No file exists " + file);
};

const readJsonFile = (fileName: string) => {
  const fileText = fs.readFileSync(fileName, "utf8");
  const data = JSON.parse(fileText);
  return data;
};

export const readYamlFile = (fileName: string) => {
  const fileText = fs.readFileSync(fileName, "utf8");
  const data = YAML.parse(fileText);
  return data;
};

export const readTextFile = (fileName: string) => {
  return fs.readFileSync(fileName, "utf8");
};

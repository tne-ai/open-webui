"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runExpertTest = void 0;
require("dotenv/config");
const graphai_1 = require("graphai");
const utils_1 = require("./utils");
const agentFilter_1 = require("../utils/agentFilter");
const llm_agents = __importStar(require("@graphai/llm_agents"));
const vanilla_agents = __importStar(require("@graphai/vanilla"));
const agents = __importStar(require("../agents"));
// import { readYamlFile } from "../utils/file_utils";
const utils_2 = require("../utils/utils");
const runner = async (uid, expertData, question) => {
    const graphData = await (0, utils_1.generateGraphFromS3)(expertData, uid, question);
    const config = {
        uid,
    };
    // console.log(JSON.stringify(graphData, null, 2));return;
    const agentFilters = (0, agentFilter_1.getAgentFilters)(false);
    const graphai = new graphai_1.GraphAI(graphData, { ...agents, ...llm_agents, ...vanilla_agents }, { agentFilters, config });
    // graphai.onLogCallback = (log: any, isUpdate: boolean) => {
    //   console.log(log);
    // };
    const result = (await graphai.run());
    // console.log(JSON.stringify(result, null, 2));
    const resultText = Object.values(result)
        .sort((a, b) => {
        return a["__timestamp"] > b["__timestamp"] ? 1 : -1;
    })
        .reduce((tmp, res) => {
        tmp.push("** " + res.nodeTitle + " **");
        tmp.push((0, utils_1.formatData)(res));
        return tmp;
    }, [])
        .join("\n");
    return resultText;
};
const runExpertTest = async (uid, expert, questions, concurrency, writeLog) => {
    const expertData = await (0, utils_1.loadReactFlowDataFromS3)(uid, "Experts/" + expert);
    const formatText = (index, result) => {
        const question = questions[index];
        if (result instanceof Error) {
            return `** Question **\n\n${question}\n\n${result.message}`;
        }
        return `** Question **\n\n${question}\n\n${result}`;
    };
    const runQuestion = async (question, index) => {
        const res = await runner(uid, expertData, question);
        writeLog(index, formatText(index, res));
        return res;
    };
    const ret = await (0, utils_2.promiseAll)(runQuestion, questions, concurrency, true);
    const resultLog = Array.from(ret.entries())
        .map(([index, result]) => formatText(index, result))
        .join("\n\n");
    writeLog(null, resultLog);
};
exports.runExpertTest = runExpertTest;

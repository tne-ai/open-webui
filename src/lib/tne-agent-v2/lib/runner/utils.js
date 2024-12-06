"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatData = exports.generateGraphFromS3 = exports.loadReactFlowDataFromS3 = void 0;
const yaml_1 = __importDefault(require("yaml"));
const expertDataModel_1 = require("../expertDataModel");
const s3_1 = require("../utils/s3");
const types_1 = require("../types");
// just for runner
const loadReactFlowDataFromS3 = async (uid, fileName) => {
    const expertData = await readYamlFromS3(uid, fileName);
    return expertData;
};
exports.loadReactFlowDataFromS3 = loadReactFlowDataFromS3;
const generateGraphFromS3 = async (expertData, uid, userPrompt) => {
    const loadModelFiles = async (fileName) => {
        const bytes = await (0, s3_1.fetchS3File)(uid, "Agents/" + fileName);
        if (bytes) {
            const data = Buffer.from(bytes).toString("utf-8");
            return yaml_1.default.parse(data);
        }
        throw new Error("loadModel failed");
    };
    const loadModuleFiles = async (fileName) => {
        const bytes = await (0, s3_1.fetchS3File)(uid, "Code/" + fileName);
        if (bytes) {
            const data = Buffer.from(bytes).toString("utf-8");
            return data;
        }
        throw new Error("loadModel failed");
    };
    const loadProcFiles = async (fileName) => {
        const bytes = await (0, s3_1.fetchS3File)(uid, "Experts/" + fileName);
        if (bytes) {
            const data = Buffer.from(bytes).toString("utf-8");
            return yaml_1.default.parse(data);
        }
        throw new Error("loadModel failed");
    };
    const expertModel = new expertDataModel_1.ExpertDataModel(loadModelFiles, loadModuleFiles, loadProcFiles); // step 1
    // TODO
    if (userPrompt) {
        expertModel.setUserPrompt(userPrompt);
    }
    await expertModel.setExpert(expertData);
    const graphData = expertModel.convertGraphAi(); // step 3;
    return graphData;
};
exports.generateGraphFromS3 = generateGraphFromS3;
const readYamlFromS3 = async (uid, fileName) => {
    const s3Expert = await (0, s3_1.fetchS3File)(uid, fileName);
    if (!s3Expert) {
        throw new Error("No file exists " + fileName);
    }
    const expertData = yaml_1.default.parse(Buffer.from(s3Expert).toString("utf-8"));
    return expertData;
};
const formatDataPythonCode = (data) => {
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
const formatData = (data) => {
    if (data.nodeType === types_1.NodeTypePythonCode) {
        return formatDataPythonCode(data);
    }
    if (data.nodeType === types_1.NodeTypeCodeGeneration) {
        return Object.values(data)
            .map((d) => {
            return (0, exports.formatData)(d);
        })
            .filter((a) => a)
            .join("\n\n");
    }
    if ([types_1.NodeTypeLLM, "openAI", "anthropic", "groq", "replicate"].includes(data.nodeType)) {
        return data.choices ? data.choices[0].message.content : "";
    }
    return data;
};
exports.formatData = formatData;

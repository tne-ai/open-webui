"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3FileDummyAgentGenerator = void 0;
const fs_1 = __importDefault(require("fs"));
const s3_1 = require("../../utils/s3");
const graphai_1 = require("graphai");
const s3FileDummyAgentGenerator = (basePath) => {
    const s3FileAgent = async ({ params }) => {
        const { fileName } = params;
        const key = `${basePath}${fileName}`;
        const data = fs_1.default.readFileSync(key);
        await (0, graphai_1.sleep)(1);
        return (0, s3_1.buffer2returnData)(data, fileName);
    };
    return s3FileAgent;
};
exports.s3FileDummyAgentGenerator = s3FileDummyAgentGenerator;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOutAgent = exports.initOutAgent = exports.outAgentDefaultValue = void 0;
const types_1 = require("../types");
exports.outAgentDefaultValue = {
    id: "",
    agent: "s3FileWriteAgent",
    params: {
        fileName: "",
    },
    passThrough: {
        nodeType: types_1.NodeTypeOut,
        nodeId: "",
        nodeTitle: "Save File",
    },
};
const initOutAgent = (id) => {
    const init = { ...exports.outAgentDefaultValue };
    if (init?.passThrough?.nodeId === "") {
        init.passThrough.nodeId = id;
    }
    return {
        ...init,
        id,
    };
};
exports.initOutAgent = initOutAgent;
const updateOutAgent = (id, title, outputName) => {
    return {
        id,
        agent: "s3FileWriteAgent",
        params: {
            fileName: outputName,
        },
        passThrough: {
            nodeType: types_1.NodeTypeOut,
            nodeId: id,
            nodeTitle: title,
        },
    };
};
exports.updateOutAgent = updateOutAgent;

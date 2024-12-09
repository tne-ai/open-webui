"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFileAgent = exports.initFileAgent = exports.fileAgentDefaultValue = void 0;
const types_1 = require("../types");
exports.fileAgentDefaultValue = {
    id: "",
    agent: "s3FileAgent",
    params: {
        fileName: "",
    },
    passThrough: {
        nodeType: types_1.NodeTypeFile,
        nodeId: "",
        nodeTitle: "Data",
    },
};
const initFileAgent = (id) => {
    const init = { ...exports.fileAgentDefaultValue };
    if (init?.passThrough?.nodeId === "") {
        init.passThrough.nodeId = id;
    }
    return {
        ...init,
        id,
    };
};
exports.initFileAgent = initFileAgent;
const updateFileAgent = (id, title, fileName, flowState) => {
    return {
        id,
        agent: "s3FileAgent",
        params: {
            fileName,
            flowState,
        },
        passThrough: {
            nodeType: types_1.NodeTypeFile,
            nodeId: id,
            nodeTitle: title,
        },
    };
};
exports.updateFileAgent = updateFileAgent;

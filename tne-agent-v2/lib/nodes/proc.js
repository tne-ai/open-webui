"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProcAgent = exports.initProcAgent = exports.procAgentDefaultValue = void 0;
const types_1 = require("../types");
exports.procAgentDefaultValue = {
    id: "",
    agent: "nestedAgent",
    params: {
        graphDataFile: "",
        outputType: "overwrite",
        useUserQuery: false,
    },
    passThrough: {
        nodeType: types_1.NodeTypeNested,
        nodeTitle: "New Process",
        nodeId: "",
    },
    isResult: true,
};
const initProcAgent = (id) => {
    const init = { ...exports.procAgentDefaultValue };
    if (init?.passThrough?.nodeId === "") {
        init.passThrough.nodeId = id;
    }
    return {
        ...init,
        id,
    };
};
exports.initProcAgent = initProcAgent;
const updateProcAgent = (id, title, proc, outputType, outputToCanvas, flowState) => {
    return {
        id,
        agent: "nestedAgent",
        params: {
            graphDataFile: proc,
            outputType: outputType,
            flowState: flowState,
            useUserQuery: false,
        },
        passThrough: {
            nodeType: types_1.NodeTypeNested,
            nodeId: id,
            nodeTitle: title,
        },
        isResult: outputToCanvas === false,
    };
};
exports.updateProcAgent = updateProcAgent;

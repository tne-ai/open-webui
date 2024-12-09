"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNestedNode = exports.promiseAll = exports.cleanObject = exports.getEnvironmentValue = void 0;
const types_1 = require("../types");
const getEnvironmentValue = (key) => {
    // vite TODO:
    //  or vite-plugin-env-compatible
    // if (import.meta?.env && import.meta?.env[key]) {
    //   return import.meta?.env[key] as string;
    // }
    if (process?.env && process?.env[key]) {
        return process?.env[key];
    }
    return "";
};
exports.getEnvironmentValue = getEnvironmentValue;
const cleanObject = (obj) => {
    return Object.keys(obj).reduce((tmp, key) => {
        if (obj[key] !== undefined && obj[key] !== null) {
            tmp[key] = obj[key];
        }
        return tmp;
    }, {});
};
exports.cleanObject = cleanObject;
const promiseAll = async (func, _params, concurrency, verbose = false) => {
    const params = _params.concat();
    const rets = Array(params.length);
    const firstParam = params.splice(0, concurrency);
    let nextKey = concurrency;
    const wrapper = async (param, key) => {
        let nextParam = param;
        let currentKey = key;
        do {
            if (verbose) {
                console.log(`run: ${currentKey}`);
            }
            try {
                const ret = await func(nextParam, currentKey);
                rets[currentKey] = ret;
            }
            catch (e) {
                if (e instanceof Error) {
                    rets[currentKey] = e;
                }
            }
            if (verbose) {
                console.log(`done: ${currentKey}`);
            }
            nextParam = params.shift();
            currentKey = nextKey;
            nextKey = nextKey + 1;
        } while (nextParam);
    };
    await Promise.all([...firstParam.keys()].map(async (key) => {
        const param = firstParam[key];
        await wrapper(param, key);
    }));
    return rets;
};
exports.promiseAll = promiseAll;
const isNestedNode = (reactFlowNode) => {
    if (reactFlowNode.type === types_1.NodeTypeText) {
        return false;
    }
    return reactFlowNode.data?.passThrough?.nodeType === types_1.NodeTypeNested;
};
exports.isNestedNode = isNestedNode;

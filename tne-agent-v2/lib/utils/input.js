"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nestedGraphResultsSource = exports.mergeSourceFromNestedGraphResultSources = exports.edge2input = exports.edge2sources = exports.edges2inputDist = void 0;
const types_1 = require("../types");
// userPrompt
//  Add the node that accepts the userPrompt to the input here.
// return inputs
//  { target: { handle: edge[] }
const edges2inputDist = (edges) => {
    return edges.reduce((tmp, edge) => {
        if (!tmp[edge.target]) {
            tmp[edge.target] = {};
        }
        if (!tmp[edge.target][edge.targetHandle]) {
            tmp[edge.target][edge.targetHandle] = [];
        }
        tmp[edge.target][edge.targetHandle].push(edge);
        return tmp;
    }, {});
};
exports.edges2inputDist = edges2inputDist;
const getNodeType = (graphAIAgent) => {
    return "value" in graphAIAgent ? types_1.NodeTypeText : graphAIAgent?.passThrough?.nodeType;
};
// Basically it expands into an array of inputs.
// If you want to use namedInputs, implement it here.
// 1. classifiy source node
// 2. Convert to inputs considering target type.
//   2.1 add user prompt(special input node)
const getSourceType = (sourceNode) => {
    if ("value" in sourceNode) {
        return types_1.NodeTypeText;
    }
    if (sourceNode?.passThrough?.nodeType === types_1.NodeTypeLLM) {
        if (sourceNode.agent === "openAIImageAgent") {
            return types_1.NodeTypeLLMImage;
        }
    }
    return sourceNode?.passThrough?.nodeType;
};
const sourceSuffix = (sourceType, targetType, inputSource) => {
    if (sourceType === types_1.NodeTypeLLM) {
        return ".choices.$0.message.content";
    }
    else if (sourceType === types_1.NodeTypeLLMImage) {
        return ".data.$0.url";
    }
    else if (sourceType === types_1.NodeTypeCodeGeneration) {
        if (targetType === types_1.NodeTypeCodeGeneration || targetType === types_1.NodeTypePythonCode) {
            return "." + inputSource + "_python";
        }
        return "." + inputSource + "_python.data";
    }
    else if (sourceType === types_1.NodeTypePythonCode) {
        if (targetType !== types_1.NodeTypeCodeGeneration && targetType !== types_1.NodeTypePythonCode) {
            return ".data";
        }
    }
    return "";
};
/*
  {
  llm: [:source1.choices...],
  query: [:source2],
  hoge: [:source3],
  }
 */
const edge2sources = (targetNode, nodeDict, edgeInputs = {}, prefix = "") => {
    const nodeType = getNodeType(targetNode);
    const sources = {};
    Object.values(edgeInputs).map((tmp) => {
        tmp.forEach((input) => {
            const sourceNode = nodeDict[input.source];
            const sourceType = getSourceType(sourceNode);
            if (!sources[sourceType]) {
                sources[sourceType] = [];
            }
            const inputSource = ":" + prefix + input.source + sourceSuffix(sourceType, nodeType, input.source);
            sources[sourceType].push(inputSource);
        });
    });
    return sources;
};
exports.edge2sources = edge2sources;
const source2llmInput = (targetNode, hasUserPrompt = true, sources) => {
    const ret = {};
    if (sources["file"]) {
        ret["file"] = sources["file"];
    }
    if (sources["llm_image"]) {
        ret["images"] = sources["llm_image"];
    }
    // prompt is user prompt.
    delete sources.file;
    delete sources.llm_image;
    const userPrompt = Object.values(sources).flat();
    if (hasUserPrompt && targetNode && targetNode.params.useUserQuery) {
        if (userPrompt.length > 0) {
            ret["prompt"] = ["[Context query: ", ":userPrompt", "] [Current input: ", ...userPrompt, "]"];
        }
        else {
            ret["prompt"] = [":userPrompt"];
        }
    }
    else {
        ret["prompt"] = userPrompt;
    }
    return {
        ...ret,
    };
};
/*
  agent: "codeGeneration",
  inputs: {
    file: [":file1", ":file2"],
    inputs: [":source1", ":source2"],
    userPrompt: ":userPrompt"
  }
 */
const source2codeGenInput = (targetNode, hasUserPrompt = true, sources) => {
    const ret = {};
    ret["file"] = sources["file"] ?? [];
    delete sources.file;
    ret["inputs"] = Object.values(sources).flat() ?? [];
    ret["userPrompt"] = hasUserPrompt && targetNode && targetNode?.params?.useUserQuery ? ":userPrompt" : "";
    return {
        ...ret,
    };
};
/*
  agent: "nested"
  inputs: {
    userPrompt: ":userPrompt",
    parent_source1: ":source1",
    parent_source2: ":source2",
  }
*/
const sourceProcParentNodeInputs = (targetNode, edgeInputs = {}) => {
    const ret = {};
    if (targetNode.params.useUserQuery) {
        ret["userPrompt"] = ":userPrompt";
    }
    Object.values(edgeInputs).map((tmp) => {
        tmp.forEach((input) => {
            ret["parent_" + input.source] = ":" + input.source;
        });
    });
    return ret;
};
// just edge to input
const edge2input = (targetNode, edgeInputs, // key string was target handle.
nodeDict, hasUserPrompt, nestedGraphResultsSource, parentSources = {}) => {
    const targetType = getNodeType(targetNode);
    // nested Node. special case.
    if (targetType === types_1.NodeTypeNested) {
        return sourceProcParentNodeInputs(targetNode, edgeInputs);
    }
    // step 1
    // TODO: separate proc or others
    const baseSources = (0, exports.edge2sources)(targetNode, nodeDict, edgeInputs);
    const rawSources = Object.keys(baseSources).length > 0 ? baseSources : Object.keys(parentSources).length > 0 ? parentSources : {};
    // rewrite.nested result!!
    const sources = (0, exports.mergeSourceFromNestedGraphResultSources)(rawSources, nestedGraphResultsSource, targetNode);
    // step 2
    // name file is automatically convert data by agent filter
    if (targetType === types_1.NodeTypeLLM) {
        return source2llmInput(targetNode, hasUserPrompt, sources);
    }
    // codeGeneration
    if (targetType === types_1.NodeTypeCodeGeneration) {
        return source2codeGenInput(targetNode, hasUserPrompt, sources);
    }
    if (targetType === types_1.NodeTypePythonCode) {
        const data = Object.values(sources).flat();
        return data.length > 0 ? { data } : {};
    }
    // inputs array
    const array = Object.values(sources).flat();
    if (array.length > 0) {
        return {
            array,
        };
    }
    return {};
};
exports.edge2input = edge2input;
const mergeSourceFromNestedGraphResultSources = (sources, nestedGraphResultsSources, targetNode) => {
    const targetType = getNodeType(targetNode);
    if (sources[types_1.NodeTypeNested]) {
        sources[types_1.NodeTypeNested].forEach((prodId) => {
            const resultSource = nestedGraphResultsSources[prodId.slice(1)];
            if (!resultSource) {
                return;
            }
            Object.keys(resultSource).forEach((_sourceType) => {
                const sourceType = _sourceType;
                if (!sources[sourceType]) {
                    sources[sourceType] = [];
                }
                resultSource[sourceType].forEach((procNodeId) => {
                    const suffix = sourceSuffix(sourceType, targetType, procNodeId);
                    sources[sourceType].push(`${prodId}.${procNodeId}${suffix}`);
                });
            });
        });
        delete sources[types_1.NodeTypeNested];
    }
    return sources;
};
exports.mergeSourceFromNestedGraphResultSources = mergeSourceFromNestedGraphResultSources;
const nestedGraphResultsSource = (nestedGraph) => {
    const nestedGraphResultNodes = noOutputNodes(nestedGraph);
    const sources = {};
    Object.keys(nestedGraph.nodes)
        .filter((nodeId) => nestedGraphResultNodes.includes(nodeId))
        .forEach((nodeId) => {
        const nestedGraphNode = nestedGraph.nodes[nodeId];
        const nodeType = getNodeType(nestedGraphNode);
        if (!sources[nodeType]) {
            sources[nodeType] = [];
        }
        sources[nodeType].push(nodeId);
    });
    return sources;
};
exports.nestedGraphResultsSource = nestedGraphResultsSource;
const noOutputNodes = (graph) => {
    const nodeKeys = Object.keys(graph.nodes);
    const remove = (key) => {
        const index = nodeKeys.findIndex((k) => k === key);
        if (index > -1) {
            nodeKeys.splice(index, 1);
        }
    };
    remove("userPrompt");
    Object.keys(graph.nodes).map((key) => {
        const node = graph.nodes[key];
        if ("inputs" in node) {
            Object.values(node.inputs ?? {})
                .flat(10)
                .filter((id) => {
                return id !== ":userPrompt" && !id.startsWith(":parent_");
            })
                .map((id) => id.split(".")[0])
                .map((id) => id.slice(1))
                .forEach((id) => remove(id));
        }
    });
    return nodeKeys;
};

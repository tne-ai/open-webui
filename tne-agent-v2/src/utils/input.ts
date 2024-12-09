import { NodeData, GraphData } from "graphai";

import {
  GraphNodeDict,
  ReactFlowEdge,
  EdgeInternalData,
  SourcesDict,
  NodeTypeCodeGeneration,
  NodeTypeLLM,
  NodeTypePythonCode,
  NodeTypeNested,
  NodeTypeLLMImage,
  NodeTypeText,
  EdgeInput,
  SourceTypes,
} from "../types";

import { CodeGenerationNodeData, LLMNodeData, ProcNodeData } from "../nodes";

// userPrompt
//  Add the node that accepts the userPrompt to the input here.

// return inputs
//  { target: { handle: edge[] }
export const edges2inputDist = (edges: ReactFlowEdge[]) => {
  return edges.reduce((tmp: EdgeInternalData, edge) => {
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

const getNodeType = (graphAIAgent: NodeData): SourceTypes => {
  return "value" in graphAIAgent ? NodeTypeText : (graphAIAgent?.passThrough?.nodeType as SourceTypes);
};

// Basically it expands into an array of inputs.
// If you want to use namedInputs, implement it here.

// 1. classifiy source node
// 2. Convert to inputs considering target type.
//   2.1 add user prompt(special input node)

const getSourceType = (sourceNode: NodeData): SourceTypes => {
  if ("value" in sourceNode) {
    return NodeTypeText;
  }
  if (sourceNode?.passThrough?.nodeType === NodeTypeLLM) {
    if (sourceNode.agent === "openAIImageAgent") {
      return NodeTypeLLMImage;
    }
  }
  return sourceNode?.passThrough?.nodeType as SourceTypes;
};

const sourceSuffix = (sourceType: SourceTypes, targetType: SourceTypes, inputSource: string) => {
  if (sourceType === NodeTypeLLM) {
    return ".choices.$0.message.content";
  } else if (sourceType === NodeTypeLLMImage) {
    return ".data.$0.url";
  } else if (sourceType === NodeTypeCodeGeneration) {
    if (targetType === NodeTypeCodeGeneration || targetType === NodeTypePythonCode) {
      return "." + inputSource + "_python";
    }
    return "." + inputSource + "_python.data";
  } else if (sourceType === NodeTypePythonCode) {
    if (targetType !== NodeTypeCodeGeneration && targetType !== NodeTypePythonCode) {
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
export const edge2sources = (targetNode: NodeData, nodeDict: GraphNodeDict, edgeInputs: EdgeInput = {}, prefix: string = ""): SourcesDict => {
  const nodeType = getNodeType(targetNode);
  const sources: SourcesDict = {};
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

type GraphAIInputs = Record<string, string | string[]>;

const source2llmInput = (targetNode: LLMNodeData, hasUserPrompt: boolean = true, sources: SourcesDict) => {
  const ret: GraphAIInputs = {};
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
    } else {
      ret["prompt"] = [":userPrompt"];
    }
  } else {
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
const source2codeGenInput = (targetNode: CodeGenerationNodeData, hasUserPrompt: boolean = true, sources: SourcesDict) => {
  const ret: GraphAIInputs = {};

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
const sourceProcParentNodeInputs = (targetNode: ProcNodeData, edgeInputs: EdgeInput = {}) => {
  const ret: GraphAIInputs = {};
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
export const edge2input = (
  targetNode: NodeData,
  edgeInputs: EdgeInput, // key string was target handle.
  nodeDict: GraphNodeDict,
  hasUserPrompt: boolean,
  nestedGraphResultsSource: Partial<Record<SourceTypes, SourcesDict>>,
  parentSources: SourcesDict = {}
) => {
  const targetType = getNodeType(targetNode);

  // nested Node. special case.
  if (targetType === NodeTypeNested) {
    return sourceProcParentNodeInputs(targetNode as ProcNodeData, edgeInputs);
  }

  // step 1
  // TODO: separate proc or others
  const baseSources = edge2sources(targetNode, nodeDict, edgeInputs);
  const rawSources = Object.keys(baseSources).length > 0 ? baseSources : Object.keys(parentSources).length > 0 ? parentSources : {};

  // rewrite.nested result!!
  const sources = mergeSourceFromNestedGraphResultSources(rawSources, nestedGraphResultsSource, targetNode);
  // step 2
  // name file is automatically convert data by agent filter
  if (targetType === NodeTypeLLM) {
    return source2llmInput(targetNode as LLMNodeData, hasUserPrompt, sources);
  }
  // codeGeneration
  if (targetType === NodeTypeCodeGeneration) {
    return source2codeGenInput(targetNode as CodeGenerationNodeData, hasUserPrompt, sources);
  }

  if (targetType === NodeTypePythonCode) {
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

export const mergeSourceFromNestedGraphResultSources = (
  sources: SourcesDict,
  nestedGraphResultsSources: Partial<Record<SourceTypes, SourcesDict>>,
  targetNode: NodeData
) => {
  const targetType = getNodeType(targetNode);

  if (sources[NodeTypeNested]) {
    sources[NodeTypeNested].forEach((prodId: string) => {
      const resultSource = nestedGraphResultsSources[prodId.slice(1) as SourceTypes];
      if (!resultSource) {
        return;
      }
      Object.keys(resultSource).forEach((_sourceType: string) => {
        const sourceType = _sourceType as SourceTypes;
        if (!sources[sourceType]) {
          sources[sourceType] = [];
        }
        resultSource[sourceType].forEach((procNodeId: string) => {
          const suffix = sourceSuffix(sourceType, targetType, procNodeId);
          sources[sourceType].push(`${prodId}.${procNodeId}${suffix}`);
        });
      });
    });
    delete sources[NodeTypeNested];
  }
  return sources;
};

export const nestedGraphResultsSource = (nestedGraph: GraphData) => {
  const nestedGraphResultNodes = noOutputNodes(nestedGraph);
  const sources: SourcesDict = {};

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

const noOutputNodes = (graph: GraphData) => {
  const nodeKeys = Object.keys(graph.nodes);

  const remove = (key: string) => {
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
        .filter((id: string) => {
          return id !== ":userPrompt" && !id.startsWith(":parent_");
        })
        .map((id: string) => id.split(".")[0])
        .map((id: string) => id.slice(1))
        .forEach((id: string) => remove(id));
    }
  });
  return nodeKeys;
};

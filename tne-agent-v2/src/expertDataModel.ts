import { graphDataLatestVersion, ComputedNodeData, NodeData } from "graphai";
import { ReactFlowData, EdgeInternalData, SourcesDict, NodeTypeNested } from "./types";

import { node2modelFileName, node2moduleFileName, node2procFileName, reactFlowNode2GraphNode } from "./utils/node2agent";
import { edge2input, edges2inputDist, edge2sources, nestedGraphResultsSource } from "./utils/input";
import { isNestedNode } from "./utils/utils";

export class ExpertDataModel {
  private expertReactFlowData: ReactFlowData = {
    nodes: [],
    edges: [],
  };

  private modelFileNames: string[] = [];
  private modelData: Record<string, ComputedNodeData> = {};

  private moduleFileNames: string[] = [];
  private moduleData: Record<string, string> = {};

  private expertFileNames: string[] = [];
  private expertData: Record<string, ReactFlowData> = {};

  private userPrompt: string | undefined = undefined;
  private edgeInternalData: EdgeInternalData = {};

  private loadModelFunction: (loadFileName: string) => Promise<ComputedNodeData>; // ComputedNodeData
  private loadModuleFunction: (loadFileName: string) => Promise<string>;
  private loadExpertFunction: (loadFileName: string) => Promise<ReactFlowData>;

  constructor(
    loadModelFunction: (loadFileName: string) => Promise<ComputedNodeData>,
    loadModuleFunction: (loadFileName: string) => Promise<string>,
    loadExpertFunction: (loadFileName: string) => Promise<ReactFlowData>
  ) {
    this.loadModelFunction = loadModelFunction;
    this.loadModuleFunction = loadModuleFunction;
    this.loadExpertFunction = loadExpertFunction;
  }

  public clone() {
    const expert = new ExpertDataModel(this.loadModelFunction, this.loadModuleFunction, this.loadExpertFunction);
    if (this.userPrompt) {
      expert.setUserPrompt(this.userPrompt);
    }
    return expert;
  }

  public async setExpert(expertReactFlowData: ReactFlowData) {
    this.expertReactFlowData = expertReactFlowData;
    this.getLoadbleModelNames();
    this.loadEdge();
    await this.loadModelFiles();
  }

  public setUserPrompt(prompt: string) {
    this.userPrompt = prompt;
  }

  // nodes
  private getLoadbleModelNames() {
    this.modelFileNames = this.expertReactFlowData.nodes
      .map((node) => {
        return node2modelFileName(node) as string;
      })
      .filter((a) => a);
    this.moduleFileNames = this.expertReactFlowData.nodes
      .map((node) => {
        return node2moduleFileName(node) as string;
      })
      .filter((a) => a);
    this.expertFileNames = this.expertReactFlowData.nodes
      .map((node) => {
        return node2procFileName(node) as string;
      })
      .filter((a) => a);
  }

  private async loadModelFiles() {
    await Promise.all([
      ...this.modelFileNames.map(async (fileName: string) => {
        this.modelData[fileName] = await this.loadModelFunction(fileName);
      }),
      ...this.moduleFileNames.map(async (fileName: string) => {
        this.moduleData[fileName] = await this.loadModuleFunction(fileName);
      }),
      ...this.expertFileNames.map(async (fileName: string) => {
        this.expertData[fileName] = await this.loadExpertFunction(fileName);
      }),
    ]);
  }

  // edges
  private loadEdge() {
    this.edgeInternalData = edges2inputDist(this.expertReactFlowData.edges);
  }

  // for nestedAgent

  public async convertGraphAi(parentSources: SourcesDict | undefined = undefined) {
    const graphNodes: Record<string, NodeData> = {};

    // convert
    const nestedGraphResultsSources: Record<string, SourcesDict> = {};

    // reactFlowData to GraphAI Agent
    await Promise.all(
      this.expertReactFlowData.nodes.map(async (reactFlowNode) => {
        // for nested node
        const { id, data } = reactFlowNode;
        const parentSourcesForChild = isNestedNode(reactFlowNode) ? edge2sources(data, graphNodes, this.edgeInternalData[id], "parent_") : {};

        const graphNode = await reactFlowNode2GraphNode(reactFlowNode, this.modelData, this.moduleData, this.expertData, parentSourcesForChild, this);
        if (graphNode) {
          graphNodes[reactFlowNode.id] = {
            ...graphNode,
          };
        }
      })
    );

    // prepare source for nest graph input
    Object.keys(graphNodes).forEach((nodeId) => {
      const graphNode = graphNodes[nodeId];
      if ("agent" in graphNode) {
        if (graphNode?.passThrough?.nodeType === NodeTypeNested && graphNode.graph && typeof graphNode?.graph === "object") {
          nestedGraphResultsSources[nodeId] = nestedGraphResultsSource(graphNode.graph);
        }
      }
    });

    // set all inputs
    Object.keys(graphNodes).forEach((nodeId) => {
      const graphNode = graphNodes[nodeId];
      if (!("value" in graphNode)) {
        const isNestedGraph = graphNode?.passThrough?.nodeType === NodeTypeNested && graphNode.graph;
        graphNode.inputs = edge2input(
          graphNode,
          this.edgeInternalData[nodeId],
          graphNodes,
          !!this.userPrompt,
          nestedGraphResultsSources,
          isNestedGraph ? parentSources : {}
        );
      }
    });

    // set userPrompt if this is root graph.
    if (this.userPrompt) {
      graphNodes["userPrompt"] = { value: this.userPrompt };
    }

    const graphData = {
      version: graphDataLatestVersion,
      nodes: graphNodes,
    };
    return graphData;
  }
}

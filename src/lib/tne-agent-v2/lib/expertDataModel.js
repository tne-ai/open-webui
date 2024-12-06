"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpertDataModel = void 0;
const graphai_1 = require("graphai");
const types_1 = require("./types");
const node2agent_1 = require("./utils/node2agent");
const input_1 = require("./utils/input");
const utils_1 = require("./utils/utils");
class ExpertDataModel {
    constructor(loadModelFunction, loadModuleFunction, loadExpertFunction) {
        this.expertReactFlowData = {
            nodes: [],
            edges: [],
        };
        this.modelFileNames = [];
        this.modelData = {};
        this.moduleFileNames = [];
        this.moduleData = {};
        this.expertFileNames = [];
        this.expertData = {};
        this.userPrompt = undefined;
        this.edgeInternalData = {};
        this.loadModelFunction = loadModelFunction;
        this.loadModuleFunction = loadModuleFunction;
        this.loadExpertFunction = loadExpertFunction;
    }
    clone() {
        const expert = new ExpertDataModel(this.loadModelFunction, this.loadModuleFunction, this.loadExpertFunction);
        if (this.userPrompt) {
            expert.setUserPrompt(this.userPrompt);
        }
        return expert;
    }
    async setExpert(expertReactFlowData) {
        this.expertReactFlowData = expertReactFlowData;
        this.getLoadbleModelNames();
        this.loadEdge();
        await this.loadModelFiles();
    }
    setUserPrompt(prompt) {
        this.userPrompt = prompt;
    }
    // nodes
    getLoadbleModelNames() {
        this.modelFileNames = this.expertReactFlowData.nodes
            .map((node) => {
            return (0, node2agent_1.node2modelFileName)(node);
        })
            .filter((a) => a);
        this.moduleFileNames = this.expertReactFlowData.nodes
            .map((node) => {
            return (0, node2agent_1.node2moduleFileName)(node);
        })
            .filter((a) => a);
        this.expertFileNames = this.expertReactFlowData.nodes
            .map((node) => {
            return (0, node2agent_1.node2procFileName)(node);
        })
            .filter((a) => a);
    }
    async loadModelFiles() {
        await Promise.all([
            ...this.modelFileNames.map(async (fileName) => {
                this.modelData[fileName] = await this.loadModelFunction(fileName);
            }),
            ...this.moduleFileNames.map(async (fileName) => {
                this.moduleData[fileName] = await this.loadModuleFunction(fileName);
            }),
            ...this.expertFileNames.map(async (fileName) => {
                this.expertData[fileName] = await this.loadExpertFunction(fileName);
            }),
        ]);
    }
    // edges
    loadEdge() {
        this.edgeInternalData = (0, input_1.edges2inputDist)(this.expertReactFlowData.edges);
    }
    // for nestedAgent
    async convertGraphAi(parentSources = undefined) {
        const graphNodes = {};
        // convert
        const nestedGraphResultsSources = {};
        // reactFlowData to GraphAI Agent
        await Promise.all(this.expertReactFlowData.nodes.map(async (reactFlowNode) => {
            // for nested node
            const { id, data } = reactFlowNode;
            const parentSourcesForChild = (0, utils_1.isNestedNode)(reactFlowNode) ? (0, input_1.edge2sources)(data, graphNodes, this.edgeInternalData[id], "parent_") : {};
            const graphNode = await (0, node2agent_1.reactFlowNode2GraphNode)(reactFlowNode, this.modelData, this.moduleData, this.expertData, parentSourcesForChild, this);
            if (graphNode) {
                graphNodes[reactFlowNode.id] = {
                    ...graphNode,
                };
            }
        }));
        // prepare source for nest graph input
        Object.keys(graphNodes).forEach((nodeId) => {
            const graphNode = graphNodes[nodeId];
            if ("agent" in graphNode) {
                if (graphNode?.passThrough?.nodeType === types_1.NodeTypeNested && graphNode.graph && typeof graphNode?.graph === "object") {
                    nestedGraphResultsSources[nodeId] = (0, input_1.nestedGraphResultsSource)(graphNode.graph);
                }
            }
        });
        // set all inputs
        Object.keys(graphNodes).forEach((nodeId) => {
            const graphNode = graphNodes[nodeId];
            if (!("value" in graphNode)) {
                const isNestedGraph = graphNode?.passThrough?.nodeType === types_1.NodeTypeNested && graphNode.graph;
                graphNode.inputs = (0, input_1.edge2input)(graphNode, this.edgeInternalData[nodeId], graphNodes, !!this.userPrompt, nestedGraphResultsSources, isNestedGraph ? parentSources : {});
            }
        });
        // set userPrompt if this is root graph.
        if (this.userPrompt) {
            graphNodes["userPrompt"] = { value: this.userPrompt };
        }
        const graphData = {
            version: graphai_1.graphDataLatestVersion,
            nodes: graphNodes,
        };
        return graphData;
    }
}
exports.ExpertDataModel = ExpertDataModel;

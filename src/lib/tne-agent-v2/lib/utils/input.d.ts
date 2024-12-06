import { NodeData, GraphData } from "graphai";
import { GraphNodeDict, ReactFlowEdge, EdgeInternalData, SourcesDict, EdgeInput, SourceTypes } from "../types";
export declare const edges2inputDist: (edges: ReactFlowEdge[]) => EdgeInternalData;
export declare const edge2sources: (targetNode: NodeData, nodeDict: GraphNodeDict, edgeInputs?: EdgeInput, prefix?: string) => SourcesDict;
type GraphAIInputs = Record<string, string | string[]>;
export declare const edge2input: (targetNode: NodeData, edgeInputs: EdgeInput, nodeDict: GraphNodeDict, hasUserPrompt: boolean, nestedGraphResultsSource: Partial<Record<SourceTypes, SourcesDict>>, parentSources?: SourcesDict) => GraphAIInputs;
export declare const mergeSourceFromNestedGraphResultSources: (sources: SourcesDict, nestedGraphResultsSources: Partial<Record<SourceTypes, SourcesDict>>, targetNode: NodeData) => SourcesDict;
export declare const nestedGraphResultsSource: (nestedGraph: GraphData) => SourcesDict;
export {};

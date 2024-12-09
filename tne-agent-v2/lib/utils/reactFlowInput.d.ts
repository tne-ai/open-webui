import { ComputedNodeData } from "graphai";
import { GraphNodeDict, ReactFlowEdge, EdgeInternalData, SourcesDict } from "../types";
export declare const edges2inputDist: (edges: ReactFlowEdge[]) => EdgeInternalData;
export declare const input2sources: (
  targetNode: ComputedNodeData,
  nodeDict: GraphNodeDict,
  inputs?: Record<string, ReactFlowEdge[]>,
  prefix?: string
) => SourcesDict;
export declare const input2input: (
  targetNode: ComputedNodeData,
  inputs: Record<string, ReactFlowEdge[]> | undefined,
  nodeDict: GraphNodeDict,
  hasUserPrompt?: boolean,
  parentSources?: Record<string, string[]>,
  nestedGraphResultsSource?: Record<string, SourcesDict>
) => Record<string, string | string[]>;
export declare const mergeSourceFromNestedGraphResultSources: (
  sources: SourcesDict,
  nestedGraphResultsSources: Record<string, SourcesDict>,
  targetNode: ComputedNodeData
) => SourcesDict;

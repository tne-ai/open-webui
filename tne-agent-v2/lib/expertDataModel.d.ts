import { ComputedNodeData, NodeData } from "graphai";
import { ReactFlowData, SourcesDict } from "./types";
export declare class ExpertDataModel {
    private expertReactFlowData;
    private modelFileNames;
    private modelData;
    private moduleFileNames;
    private moduleData;
    private expertFileNames;
    private expertData;
    private userPrompt;
    private edgeInternalData;
    private loadModelFunction;
    private loadModuleFunction;
    private loadExpertFunction;
    constructor(loadModelFunction: (loadFileName: string) => Promise<ComputedNodeData>, loadModuleFunction: (loadFileName: string) => Promise<string>, loadExpertFunction: (loadFileName: string) => Promise<ReactFlowData>);
    clone(): ExpertDataModel;
    setExpert(expertReactFlowData: ReactFlowData): Promise<void>;
    setUserPrompt(prompt: string): void;
    private getLoadbleModelNames;
    private loadModelFiles;
    private loadEdge;
    convertGraphAi(parentSources?: SourcesDict | undefined): Promise<{
        version: number;
        nodes: Record<string, NodeData>;
    }>;
}

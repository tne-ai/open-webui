import { ReactFlowNodeFile } from "../../../types";
export declare const reactFlowNode2GraphS3FileNode: (node: ReactFlowNodeFile) => {
  agent: string;
  params: {
    fileName: string;
  };
  passThrough: {
    nodeType: string;
    nodeId: string;
  };
};

import { S3Data } from "../../types";
import { fetchS3File } from "../../utils/s3";
export type Manifest = {
    model: any;
    prompt: string;
    temperature: number;
    max_tokens: number;
};
export declare const updateDataContextBuffer: (uid: string, dataSource: S3Data) => string;
export declare const getCodegenPrompt: (uid: string, dataSources: S3Data[], prompt: string) => string;
export declare const getCodegenManifest: (fetchFile: typeof fetchS3File, procStepPrompt: string, codegenPrompt?: string, model?: any) => Promise<Manifest>;

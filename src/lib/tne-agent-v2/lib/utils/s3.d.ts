import { S3Data } from "../types";
export { S3Data };
export declare const fetchS3File: (uid: string, fileName: string, region?: string, bucket?: string, verbose?: boolean) => Promise<Uint8Array | undefined>;
export declare const writeS3File: (uid: string, fileName: string, Body: string | undefined, region?: string, bucket?: string, verbose?: boolean) => Promise<import("@aws-sdk/client-s3").PutObjectCommandOutput>;
export declare const buffer2returnData: (data: Buffer, fileName: string) => S3Data;
export declare const fileName2imageType: (fileName: string) => "jpeg" | "png" | "gif" | "unknown";
export declare const fileName2fileType: (fileName: string) => "text" | "image" | "csv" | "json" | "yaml" | "none";

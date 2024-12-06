export type S3ImageData = {
    dataType: "image";
    fileName: string;
    imageData: string;
};
export type S3TextData = {
    dataType: "text" | "csv" | "json" | "yaml" | "none";
    fileName: string;
    text: string;
};
export type S3Data = S3ImageData | S3TextData;

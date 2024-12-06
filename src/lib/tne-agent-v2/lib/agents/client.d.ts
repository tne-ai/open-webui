export declare function streamClient(url: string, contentType: string, postData: unknown): AsyncGenerator<string, void, unknown>;
export declare function streamingRequest<T>(url: string, postData: unknown): AsyncGenerator<Awaited<T>, void, unknown>;
export declare const httpRequest: <T>(url: string, postData: unknown) => Promise<T>;

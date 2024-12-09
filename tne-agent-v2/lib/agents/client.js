"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpRequest = void 0;
exports.streamClient = streamClient;
exports.streamingRequest = streamingRequest;
async function* streamClient(url, contentType, postData) {
    const completion = await fetch(url, {
        headers: {
            "Content-Type": contentType,
        },
        method: "POST",
        body: JSON.stringify(postData),
    });
    const reader = completion.body?.getReader();
    if (completion.status !== 200 || !reader) {
        throw new Error("Request failed");
    }
    const decoder = new TextDecoder("utf-8");
    let done = false;
    while (!done) {
        const { done: readDone, value } = await reader.read();
        if (readDone) {
            done = readDone;
            reader.releaseLock();
        }
        else {
            const token = decoder.decode(value, { stream: true });
            yield token;
        }
    }
}
async function* streamingRequest(url, postData) {
    const generator = streamClient(url, "application/json", postData);
    // const messages = [];
    for await (const token of generator) {
        const dataSet = token.split("\n");
        for (const jsonString of dataSet) {
            // console.log(jsonString);
            if ((jsonString.slice(0, 1) === "{", jsonString.slice(-1) === "}")) {
                const data = JSON.parse(jsonString);
                // console.log(JSON.stringify(data, null, 2));
                yield data;
            }
        }
    }
}
const httpRequest = async (url, postData) => {
    const contentType = "application/json";
    const res = await fetch(url, {
        headers: {
            "Content-Type": contentType,
        },
        method: "POST",
        body: JSON.stringify(postData),
    });
    if (res.status !== 200) {
        throw new Error("Request failed");
    }
    return (await res.json());
};
exports.httpRequest = httpRequest;

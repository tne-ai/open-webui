"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pythonCodeAgent = void 0;
const utils_1 = require("./utils");
const utils_2 = require("../../utils/utils");
const pythonCodeAgent = async ({ params, namedInputs, config, }) => {
    const { code, data } = {
        ...params,
        ...namedInputs,
    };
    const python_runner_server = (0, utils_2.getEnvironmentValue)("PYTHON_RUNNER_SERVER") || "http://0.0.0.0:8080";
    const { session_id, uid } = (config ?? {});
    const runCode = (0, utils_1.extractPythonCodeForNode)((0, utils_1.extractPythonCode)(code ?? ""));
    const postData = data && Array.isArray(data) && data.length === 1 ? data[0] : data;
    const postBody = { code: runCode, session_id, uid, data: postData };
    const url = python_runner_server + "/code_runner/v1/python_code";
    try {
        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(postBody),
        });
        if (!response.ok) {
            const errorDetails = await response.text();
            return {
                onError: {
                    message: `Code execution error: ${errorDetails}`,
                },
            };
        }
        return (await response.json());
    }
    catch (error) {
        console.error("Error executing Python code:", error);
        return {
            onError: {
                message: "Unexpected error occurred while executing Python code.",
                details: error instanceof Error ? error.message : String(error),
            },
        };
    }
};
exports.pythonCodeAgent = pythonCodeAgent;
const pythonCodeAgentInfo = {
    name: "pythonCodeAgent",
    agent: exports.pythonCodeAgent,
    mock: exports.pythonCodeAgent,
    inputs: {},
    output: {},
    samples: [],
    description: "Python Code Agent",
    category: ["python"],
    author: "",
    repository: "",
    license: "",
    stream: true,
};
exports.default = pythonCodeAgentInfo;

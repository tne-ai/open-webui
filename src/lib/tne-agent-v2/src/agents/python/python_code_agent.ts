import { AgentFunction, AgentFunctionInfo } from "graphai";
import { extractPythonCode, extractPythonCodeForNode } from "./utils";
import { getEnvironmentValue } from "../../utils/utils";

// params.code
type ParamInput = {
  code?: string;
  data?: unknown;
};

type Config = {
  session_id?: string;
  uid?: string;
};

type OnError = {
  onError: {
    message: string;
    status?: number;
    details?: string | Record<string, unknown>;
  };
};

type ResultData = Record<string, never>;

export const pythonCodeAgent: AgentFunction<ParamInput, ResultData | OnError, null, ParamInput> = async ({
  params,
  namedInputs,
  config,
}) => {
  const { code, data } = {
    ...params,
    ...namedInputs,
  };
  const python_runner_server = getEnvironmentValue("PYTHON_RUNNER_SERVER") || "http://0.0.0.0:8080";

  const { session_id, uid } = (config ?? {}) as Config;

  const runCode = extractPythonCodeForNode(extractPythonCode(code ?? ""));

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

    return (await response.json()) as ResultData;
  } catch (error) {
    console.error("Error executing Python code:", error);
    return {
      onError: {
        message: "Unexpected error occurred while executing Python code.",
        details: error instanceof Error ? error.message : String(error),
      },
    };
  }
};

const pythonCodeAgentInfo: AgentFunctionInfo = {
  name: "pythonCodeAgent",
  agent: pythonCodeAgent,
  mock: pythonCodeAgent,
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

export default pythonCodeAgentInfo;

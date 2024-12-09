import { AgentReactFlowNode, NodeTypeNested, NodeTypeText } from "../types";

export const getEnvironmentValue = (key: string) => {
  // vite TODO:
  //  or vite-plugin-env-compatible
  // if (import.meta?.env && import.meta?.env[key]) {
  //   return import.meta?.env[key] as string;
  // }
  if (process?.env && process?.env[key]) {
    return process?.env[key];
  }
  return "";
};

export const cleanObject = (obj: Record<string, unknown>) => {
  return Object.keys(obj).reduce((tmp: Record<string, unknown>, key) => {
    if (obj[key] !== undefined && obj[key] !== null) {
      tmp[key] = obj[key];
    }
    return tmp;
  }, {});
};

export const promiseAll = async <ParamType = unknown, RetType = unknown>(
  func: (param: ParamType, index: number) => Promise<RetType>,
  _params: ParamType[],
  concurrency: number,
  verbose = false
) => {
  const params = _params.concat();
  const rets = Array(params.length) as (RetType | Error)[];
  const firstParam = params.splice(0, concurrency);
  let nextKey = concurrency;

  const wrapper = async (param: ParamType, key: number) => {
    let nextParam: ParamType | undefined = param;
    let currentKey = key;
    do {
      if (verbose) {
        console.log(`run: ${currentKey}`);
      }
      try {
        const ret = await func(nextParam, currentKey);
        rets[currentKey] = ret;
      } catch (e) {
        if (e instanceof Error) {
          rets[currentKey] = e;
        }
      }
      if (verbose) {
        console.log(`done: ${currentKey}`);
      }
      nextParam = params.shift();
      currentKey = nextKey;
      nextKey = nextKey + 1;
    } while (nextParam);
  };

  await Promise.all(
    [...firstParam.keys()].map(async (key: number) => {
      const param = firstParam[key];
      await wrapper(param, key);
    })
  );
  return rets;
};

export const isNestedNode = (reactFlowNode: AgentReactFlowNode) => {
  if (reactFlowNode.type === NodeTypeText) {
    return false;
  }
  return reactFlowNode.data?.passThrough?.nodeType === NodeTypeNested;
};

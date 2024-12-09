import {
  expectDemoData,
  expectPythonCodeData,
  expectCSVDemo,
  expectDescribeChain,
  expectLlmEndpoint,
  expectJury,
  expectRag,
  expectSemantic,
  expectFashion,
  expectCodeGen,
  expectNestedData,
} from "../data/graphai_data";
import { generateGraph } from "./common";

import test from "node:test";
import assert from "node:assert";

test("test demo1", async () => {
  const graphData = await generateGraph("/../data/studio_data/simple/", "GraphAI", "Please tell me about particle physics in 1000 words.");
  console.log(JSON.stringify(graphData, null, 2));
  // assert.deepStrictEqual(graphData, expectDemoData);
});
test("test demo2", async () => {
  const graphData = await generateGraph("/../data/studio_data/all/", "All", "Please tell me about particle physics in 1000 words.");
  console.log(JSON.stringify(graphData, null, 2));
  // assert.deepStrictEqual(graphData, expectDemoData);
});

test("test demo3", async () => {
  const graphData = await generateGraph("/../data/studio_data/chat_sample/", "Demo", "Please tell me about particle physics in 1000 words.");
  // console.log(JSON.stringify(graphData, null, 2));
  assert.deepStrictEqual(graphData, expectDemoData);
});

/*
test("test pytest", async () => {
  const graphData = await generateGraph("/../data/expert_data/pytest/", "PythonTest");
   console.log(JSON.stringify(graphData));
  assert.deepStrictEqual(graphData, expectPythonCodeData);
});

test("test csv_demo", async () => {
  const graphData = await generateGraph("/../data/expert_data/csv_demo/", "CSVDemo", "Which product has the highest gross margin?");
  // console.log(JSON.stringify(graphData, null, 2));
  assert.deepStrictEqual(graphData, expectCSVDemo);
});

test("test describe_chain", async () => {
  const graphData = await generateGraph("/../data/expert_data/describe_chain/", "DescribeChain");
  // console.log(JSON.stringify(graphData));
  assert.deepStrictEqual(graphData, expectDescribeChain);
});

test("test llm_endpoints", async () => {
  const graphData = await generateGraph("/../data/expert_data/llm_endpoints/", "LLMEndpoints", "write a 500 word essay on trains");
  // console.log(JSON.stringify(graphData));
  assert.deepStrictEqual(graphData, expectLlmEndpoint);
});

test("test jury", async () => {
  const graphData = await generateGraph("/../data/expert_data/jury/", "Jury", "who is Bruce Springsteen?");
  // console.log(JSON.stringify(graphData));
  assert.deepStrictEqual(graphData, expectJury);
});

test("test rag", async () => {
  const graphData = await generateGraph("/../data/expert_data/rag/", "RAGTest");
  // console.log(JSON.stringify(graphData));
  assert.deepStrictEqual(graphData, expectRag);
});
test("test semantic", async () => {
  const graphData = await generateGraph("/../data/expert_data/semantic/", "SemanticTest");
  // console.log(JSON.stringify(graphData));
  assert.deepStrictEqual(graphData, expectSemantic);
});
test("test fashion", async () => {
  const graphData = await generateGraph("/../data/expert_data/fashion/", "Fashion");
  // console.log(JSON.stringify(graphData));
  assert.deepStrictEqual(graphData, expectFashion);
});
test("test code generation", async () => {
  const graphData = await generateGraph("/../data/expert_data/codegen/", "Sample");
  // console.log(JSON.stringify(graphData, null, 2));
  assert.deepStrictEqual(graphData, expectCodeGen);
});
*/

test("test nested graph", async () => {
  const graphData = await generateGraph("/../data/studio_data/nestedGraph/", "ExecuteAndSummarize", "what are the first 10 fibonacci numbers?");
  console.log(JSON.stringify(graphData, null, 2));
  // assert.deepStrictEqual(graphData, expectNestedData);
});

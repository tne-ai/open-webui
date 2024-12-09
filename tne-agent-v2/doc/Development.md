**Creating an Agent**

## tne-agent

1. Obtain a sample node from ReactFlow and an expert that uses it.
2. Implement and test the conversion of nodes to GraphAI models.
3. Implement and test the conversion of edges (input) between nodes.
4. Create an agent. Agents that support streaming should not forget to handle streaming processing. Test the agent.
5. Test the conversion of experts and models to graph data.
6. Run the converted expert.

**studio and**

7. Add an agent to express and studio. If using a tne-agent, no additional work is required.
8. In studio, convert results (convResult) from Agent Result to ChatMessage.
   - `studio/src/libs/graphStreaming.ts`
   - - string is text (agent single stream) or json (agent multi stream), so individual handling is unnecessary

### Conversion of ReactFlow nodes (+ model) to GraphAI nodes (ComputedNode)

- `src/utils/reactFlowNode.ts`
  - implements the conversion from React Flow node to GraphAI node.
- The actual conversion code is in `src/utils/reactFlowNode2GraphNode/`.
- `src/types/react_flow.ts`
  - adds a type to ReactFlow node.
  - The node.type must be specified

#### Test of conversion from React Flow node to GraphAI node. test for (2)

If you add the yaml files before and after the return, the data will be verified with unit test.

`tests/data/model_data/{type}/{name}` contains:

- react_flow.yaml: data for the ReactFlow node
- model.yaml: data for the model required when slashgptManifest is used
- graphai_node.yaml: converted data for GraphAI node

If these files are present, `tests/graph/test_reactflow_model2graphdata_model.ts` will automatically run a test.

The converted GraphAI node must return ComputedNodeData. The minimum requirement is the agent name.
https://github.com/receptron/graphai/blob/main/packages/graphai/src/type.ts

### Conversion of ReactFlow edges data to GraphAI inputs element (step (3))

- `src/utils/reactFlowInput.ts`

  - usually the results of the previous node are passed to inputs as an array
  - then no conversion required if anget is expecting data to be passed to inputs as an array
  - If you want to specify an agent-specific input, such as a named input, implement it here.

- unit test:
  - `tests/graph_test/test_input.ts`

### Agent Implementation (4)

- Use a standard agent provided by GraphAI (e.g., llm)
- Use src/agents/ for TNE-exclusive agents
- Agents have environment variables and collaborations with other services, making it difficult to run unit tests in CI:
  - `tests/run/run_*_agent.ts`: places code that runs the agent individually.
  - AWS_PROFILE=Profile node --test --require ts-node/register ./tests/run/run_xxxx_agent.ts

### Expert Conversion (5)

If you have the necessary agent information in (2), (3), and (4), you can convert expert to GraphData.
Test the conversion.

`tests/data/expert_data/{name}` contains expert files and model data

GraphAI conversion results are placed in {tests/data/expect_graphai_data/{

`{tests/graph/test_expert2graph_data.ts` adds:

- directory name
- expert file name
- user prompt

Add these and test.

### Run Expert (GraphAI) (6)

tests/run/run\_\*\*\*.ts is added to convert experts to GraphAI and run them.

```
node --test --require ts-node/register ./tests/run/run_xxx.ts
```

.env must not be forgotten.

### Extra

#### Post GraphData to Express

tests/data/expect_graphai_data is posted to express server:

```
npx ts-node scripts/post_xxx.ts
```

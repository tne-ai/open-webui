### README

## Quick Start to run Studio GraphAI integration

- run code runner

```
cd code-runner
poetry install
IS_DEBUG=1 RUN_LOCAL_RAY=1 AWS_PROFILE=XXX poetry run python  server/server.py
```

- run express server

```
cd graphai_express
yarn install
S3_AGENT_BUCKET=bp-authoring-files S3_AGENT_REGION="us-west-2" AWS_PROFILE=XXX OPENAI_API_KEY=sk-xxx yarn run server
```

- run studio

```
cd studio
yarn install
VITE_GRAPHAI_DEV=1  yarn run vite
```

## Overview

This package includes these features

- To convert node data from React Flow to agent data for GraphAI.
  - src/expertDataModel.ts
- GraphAI Agents of tne.
  - src/agents/
- Utilities that handle http streaming chunks.
  - src/chunk_parser.ts
- Expert test runner
  - src/runner/runner.ts

These are used on both server(graphai_express) and client(studio).

## Data converter Details

1. **Data Preparation**:

   - Prepare node data from React Flow.
   - Prepare data from a custom model(summarize.model).

2. **Data Conversion**:

   - Use the two prepared datasets to create agent data for GraphAI.

3. **Testing**:

   - The test directory contains subdirectories corresponding to different LLM models, such as `tests/data/llm/llama`.
   - Each subdirectory contains the following files:
     - `rf.yaml`: React Flow node data
     - `model.yaml`: model data set in slashgptManifest.
     - `graphai_node.yaml`: GraphAI agent data

4. **Unit Tests**:

   - Unit tests use these files to verify that the conversion process is correct.

5. **Adding New Data**:
   - Add new node and model data to increase the test coverage.

## Expert test runner

```
S3_AGENT_BUCKET=bp-authoring-files S3_AGENT_REGION="us-west-2" \
PYTHON_RUNNER_SERVER=http://0.0.0.0:8080 \
OPENAI_API_KEY=sk-xxxxx\
AWS_PROFILE=XXXX node --test --require ts-node/register ./ie_tests/test_runner.ts
```

uid, expert file, quest list are managed in this file `ie_tests/test_data.yaml`
Please update this file.

## Documents

- [Table between ReactFlow Node Type and graphai agent(Node.md)](./doc/Node.md)
- [Expert(ReactFlow) to GraphAI GraphData data conversion development](./doc/Development.md)

## INSTALL

```
yarn run install
```

## Testing

```
yarn run test
```

## Run expert

S3_AGENT_BUCKET=bp-authoring-files S3_AGENT_REGION=us-west-2 \
EMBEDDINGS_DB_PASSWORD=xxxx \
PYTHON_RUNNER_SERVER=http://0.0.0.0:8080 \
OPENAI_API_KEY=sk-xxxx
AWS_PROFILE=xxx node --test --require ts-node/register ./tests/run/run_xxx.ts

## Environment Variables

#### TNE Agent

| Name                   | Agents                         | default Value                                           |
| ---------------------- | ------------------------------ | ------------------------------------------------------- |
| PYTHON_RUNNER_SERVER   | PythonCodeRunner               | "http://0.0.0.0:8080"                                   |
| S3_AGENT_REGION        | s3FileAgent / s3FileWriteAgent | us-west-2                                               |
| S3_AGENT_BUCKET        | s3FileAgent / s3FileWriteAgent | -                                                       |
| EMBEDDINGS_DB_PASSWORD | ragAgent / semanticAgent       | EMPTY_PASSWORD                                          |
| RAG_DB_HOST            | ragAgent / semanticAgent       | postgresql-ebp.cfwmuvh4blso.us-west-2.rds.amazonaws.com |
| OPENAI_API_KEY         | ragAgent                       | EMPTY_KEY                                               |

#### GraphAI Agent

| Name                 | Agents                         |
| -------------------- | ------------------------------ |
| REPLICATE_API_TOKEN  | replicateAgent                 |
| OPENAI_API_KEY       | openAIAgent / openAIImageAgent |
| GROQ_API_KEY         | groqAgent                      |
| GOOGLE_GENAI_API_KEY | geminiAgent                    |
| ANTHROPIC_API_KEY    | anthropicAgent                 |

### config

Other settings include params (node ​​yaml) and config (passed from GraphAI constructor).

#### rag agent

| name         | from                                      |
| ------------ | ----------------------------------------- |
| ragServerUrl | params.ragServerUrl / config.ragServerUrl |
| ragDbName    | param.ragDbName                           |

#### semanticAgent

| name              | from                                               |
| ----------------- | -------------------------------------------------- |
| semanticDbName    | param.semanticDbName                               |
| semanticServerUrl | params.semanticServerUrl, config.semanticServerUrl |

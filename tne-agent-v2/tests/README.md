# Expert Directories

- data/expert_data
  - Put expert and model file from Studio
- data/expect_graphai_data

  - GraphData converted from expert_data.

- graph/test_expert2graph_data.ts
  - This script convert from expert in data/expert_data data to graphData, then confirm that this result much data of data/expect_graphai_data.
  - This file requires a user query. You will add test manually.

# Model Directories

- data/model_data/{type}/{name}/

  - react_flow.yaml
    - Node data of react flow.
  - model.yaml
    - Model data of studio.
  - graphai_node.yaml
    - Converted GraphAI Node data.

- graph/test_reactflow_model2graphdata_model.ts
  - This script convert from expert model data to GraphAI model.
  - This script automatically read model_data directories.

yarn run test
Run test_xxxx.ts files. These files can be tested individually

AWS_PROFILE=abc yarn run run
Run run_xxxx.ts files. Those files actually call APIs, so environment variables and AWS profiles are required.

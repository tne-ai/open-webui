# Agentの作り方

## tne-agent

1. ReactFlowのnodeのサンプルと、それを使ったexpertを入手
2. nodeをGraphAIのmodelへの変換を実装
3. node同士の接続(edgeをinputへ）の変換を実装しテスト
4. agentを実装する. StreamingをサポートするagentはStreaming処理を忘れずに。agentをテストする
5. expertとmodelを元にGraphDataへの変換をテストする。
6. 変換したexpertを動かす

# studioと

7. expressとstudioにagentを追加する.tne agentで追加していれば、特に作業は不要かも。
8. Studioで、結果を変換する(convResult) Agent ResultをChatMessageへの変換

- studio/src/libs/graphStreaming.ts
  - stringはtext(agentがsingle stream) or json(agentがmulti stream)でdiffを送るので個別の対応は不要

### ReactFlowのnode( + model)からGraphAIのnode(ComputedNode)への変換実装(2)

- src/utils/reactFlowNode.ts で変換する。
- src/utils/reactFlowNode2GraphNode/ 以下が実際の変換コード。
- src/types/react_flow.ts
  - にReactFlowのnodeの型追加必要。node.typeで型推定

#### (2)の変換のテスト

tests/data/model_data/{type}/{name}以下に

- react_flow.yaml
  - ReactFlowのnodeデータ
- model.yaml
  - slashgptManifestに指定されている場合に必要なmodelデータ
- graphai_node.yaml
  - 変換後のGraphAIのnodeデータ

これらのファイルが有れば、
tests/graph/test_reactflow_model2graphdata_model.ts
で自動的にテストがなされる

変換後のGraphAIのnodeは、以下のファイルの`ComputedNodeData`を返す必要がある。
minimum requirementはagent(agent名）だけ。
https://github.com/receptron/graphai/blob/main/packages/graphai/src/type.ts

### ReactFlowのedgeからinputsへ変換(3)

- src/utils/reactFlowInput.ts

  - 通常は変換不要(opensourceのagentを使う場合に変換する、など）

- unit test
  - tests/graph_test/test_input.ts

### Agentの実装(4)

- GraphAIで標準で用意されているAgentはそれを使う(llmなど）
- TNE独自のものはsrc/agents/以下におく
- Agentは環境変数や他サービスとの連携があるので、CIでのUnitTestは難しい
  - tests/run/run\_\*\_agent.ts に、agentを単体で動かすコードを置く
  - AWS_PROFILE=Profile node --test --require ts-node/register ./tests/run/run_xxxx_agent.ts

### expert 変換(5)

(2)(3)(4)で必要なagentの情報が揃っている場合、expertをGraphDataに変換できる。
その変換のテストを行う。

tests/data/expert_data/{name} 以下にexpertファイルとmodelデータをおく

GraphAIへの変換後のデータを、tests/data/expect_graphai_data 以下におく

tests/graph/test_expert2graph_data.tsに

- directory名
- expertファイル名
- user promptを追加

を追加し、テスト

### run expert(graphai) (6)

tests/run/run\_\*\*\*.tsを追加

expertからGraphAIへ変換して実行される

```
node --test --require ts-node/register ./tests/run/run_xxx.ts
```

.envを忘れずに。

### おまけ

#### post GraphData to express

tests/data/expect_graphai_dataをexpressサーバにpost

```
npx ts-node scripts/post_xxx.ts
```
